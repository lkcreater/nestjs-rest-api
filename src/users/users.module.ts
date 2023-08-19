import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserProfile } from 'src/user-profile/entities/user-profile.entity';
import { LoggerService } from 'src/logger/logger.service';
import { Logger } from 'src/logger/entities/logger.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserProfile, Logger])],
  controllers: [UsersController],
  providers: [UsersService, LoggerService],
})
export class UsersModule {}
