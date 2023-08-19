import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

//-- IMPORT ENTITY
import { User } from './entities/user.entity';
import { UserProfile } from 'src/user-profile/entities/user-profile.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(UserProfile) private profileRepo: Repository<UserProfile>,
  ) {}

  async findAll(): Promise<[User[], number]> {
    const attribs = [
      'uuid_token',
      'username',
      'email',
      'is_active',
      'status',
      'create_at',
      'update_at',
    ];
    const selected = attribs.map((attr) => `u.${attr}`);
    const query = this.userRepo
      .createQueryBuilder('u')
      .select(selected)
      .leftJoin('u.userProfile', 'prof')
      .addSelect(['prof.first_name', 'prof.last_name', 'prof.phone'])
      .where('u.is_active = :isActive', {
        isActive: true,
      });
    return await query.getManyAndCount();
  }

  async findOneByToken(token: string): Promise<User> {
    const model = await this.userRepo
      .createQueryBuilder('u')
      .where('u.is_active = :isActive AND u.uuid_token = :token', {
        token: token,
        isActive: true,
      })
      .getOne();

    return this.compareModelUser(model);
  }

  async findOne(id: number): Promise<User> {
    const model = await this.userRepo
      .createQueryBuilder('u')
      .where('u.is_active = :isActive AND u.id = :id', {
        id: id,
        isActive: true,
      })
      .getOne();

    return this.compareModelUser(model);
  }

  compareModelUser(model: User) {
    delete model.id;
    delete model.password;
    delete model.token;
    return {
      ...model,
      userProfile: model.userProfile,
    };
  }
}
