import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

//-- Entity --
import { User } from './entities/user.entity';
import { UserProfile } from 'src/user-profile/entities/user-profile.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(UserProfile) private profileRepo: Repository<UserProfile>
  ) {}

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async findAll(): Promise<[User[], number]> {
    const attribs = ['uuid_token', 'username', 'email', 'is_active', 'status', 'create_at', 'update_at'];
    let selected = attribs.map(attr => `u.${attr}`);
    const query = this.userRepo
              .createQueryBuilder('u')
              .select(selected)
              .leftJoin('u.userProfile', 'prof')
              .addSelect([
                'prof.first_name',
                'prof.last_name',
                'prof.phone',
              ]);
    return await query.getManyAndCount();
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
