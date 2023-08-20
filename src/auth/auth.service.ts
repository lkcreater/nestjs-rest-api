import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { UserProfile } from 'src/user-profile/entities/user-profile.entity';
import { User } from 'src/users/entities/user.entity';
import { SignupAuthDto } from './dto/signup-auth.dto';
import { jwtConstant } from 'src/@constants/jwt-secret.constant';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { SignInAuthDto } from './dto/signin-auth.dto';
import {
  interDecoratorLogger,
  interResponceApi,
  interResponseToken,
} from 'src/@types';
import { LoggerService } from 'src/logger/logger.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private dataSource: DataSource,
    private loggerService: LoggerService,
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(UserProfile) private profileRepo: Repository<UserProfile>,
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
  async actionSignUp(
    origin: interDecoratorLogger,
    createUserDto: SignupAuthDto,
  ): Promise<interResponceApi<User>> {
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
        uid: userModel.id,
      });
      //-- seve data
      await queryTransaction.commitTransaction();
      //-- return data
      return {
        status: true,
        data: this.compareModelUser(userModel),
      };
    } catch (error) {
      //-- save data error rollback
      await queryTransaction.rollbackTransaction();
      this.loggerService.error(error, {
        origin: origin,
        data: [error],
      });
      //-- responce error
      throw new InternalServerErrorException(['Error: users insert', error]);
    } finally {
      await queryTransaction.release();
    }
  }

  //-- action sign-in
  async actionSignIn(
    origin: interDecoratorLogger,
    signInAuthDto: SignInAuthDto,
  ): Promise<interResponceApi<interResponseToken>> {
    const attrib = signInAuthDto;
    let isVertify = false;

    const models = await this.userRepo.findOneBy({
      username: attrib.username,
      is_active: true,
    });
    if (models) {
      isVertify = await this.vertifyPassword(attrib.password, models.password);
    }
    if (isVertify === false) {
      throw new BadRequestException(['username or password is incorrect!']);
    }

    const accessToken = this.setToken({
      id: models.id,
      username: models.username,
      email: models.email,
      uuid_token: models.uuid_token,
    });

    const data = {
      access_token: accessToken,
      usernsme: models.username,
      email: models.email,
    };

    this.loggerService.log(
      `Sign-In success: ${data.usernsme}, Email: ${data.email}`,
      {
        origin: origin,
        data: [data],
      },
    );

    return {
      status: true,
      data: data,
    };
  }

  compareModelUser(model: User) {
    delete model.id;
    delete model.token;
    delete model.password;
    return model;
  }
}
