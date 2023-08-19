import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { UserProfile } from 'src/user-profile/entities/user-profile.entity';
import { User } from 'src/users/entities/user.entity';
import { SignupAuthDto } from './dto/signup-auth.dto';
import { jwtConstant } from 'src/@constants/jwt-secret.constant';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { SignInAuthDto } from './dto/signin-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private dataSource: DataSource,
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(UserProfile) private profileRepo: Repository<UserProfile>
  ) {}

  async vertifyPassword(
    password: string,
    hastPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hastPassword);
  }

  async setHashPassword(password: string): Promise<string> {
    const saltOrRounds = 10;
    return await bcrypt.hash(password, saltOrRounds);
  }

  setToken<T extends object = any>(payloads: T): string {
    return this.jwtService.sign(payloads, jwtConstant);
  }

  //-- action sign-up 
  async actionSignUp(createUserDto: SignupAuthDto) {
    const attrib: SignupAuthDto = createUserDto;

    //-- username or email already exists
    const models = await this.userRepo.find({
      where: [{ username: attrib.username }, { email: attrib.email }],
    });
    if (models && models.length > 0)
      throw new BadRequestException(['Username or Email already exists!']);

    attrib.password = await this.setHashPassword(createUserDto?.password);
    attrib.token = this.setToken({ user: attrib.username });

    //-- provide transaction rollback
    const queryTransaction = this.dataSource.createQueryRunner();
    //-- start transaction
    await queryTransaction.startTransaction();
    try {
      //-- setup data attributes
      const userModel = await queryTransaction.manager.save(User, attrib);
      await queryTransaction.manager.save(UserProfile, {
        ...attrib,
        uid: userModel.id
      });
      //-- seve data
      await queryTransaction.commitTransaction();
      //-- return data
      return this.compareModelUser(userModel);
    } catch (error) {
      //-- save data error rollback
      await queryTransaction.rollbackTransaction();
      //-- responce error
      throw new InternalServerErrorException(['Error: users insert', error]);
    } finally {
      await queryTransaction.release();
    }
  }

  //-- action sign-in
  async actionSignIn(signInAuthDto: SignInAuthDto) {
    const attrib = signInAuthDto;
    let isVertify : boolean = false;

    const models = await this.userRepo.findOneBy({ username: attrib.username });
    if(models){
      isVertify = await this.vertifyPassword(attrib.password, models.password);
    }
    if (isVertify === false) {
      throw new BadRequestException(['username or password is incorrect!']);
    }
    return this.compareModelUser(models);
  }

  compareModelUser(model: User) {
    delete model.id;
    delete model.token;
    delete model.password;
    return model;
  }
}
