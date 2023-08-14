import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { jwtConstant } from 'src/@constants/jwt-secret.constant';

//-- Entity --
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User) private userRepo: Repository<User>,
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

  async actionSignUp(createUserDto: CreateUserDto) {
    const attrib: CreateUserDto = createUserDto;

    //-- username or email already exists
    const models = await this.userRepo.find({
      where: [{ username: attrib.username }, { email: attrib.email }],
    });
    if (models && models.length > 0)
      throw new BadRequestException(['Username or Email already exists!']);

    attrib.password = await this.setHashPassword(createUserDto?.password);
    attrib.token = this.setToken({ user: attrib.username });
    return attrib; //await this.userRepo.save<CreateUserDto>(attrib);
  }

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
