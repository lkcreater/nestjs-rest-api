import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { UserProfile } from 'src/user-profile/entities/user-profile.entity';
import { JwtService } from '@nestjs/jwt';
import { LoggerService } from 'src/logger/logger.service';
import { Logger } from 'src/logger/entities/logger.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserProfile, Logger])],
  controllers: [AuthController],
  providers: [AuthService, JwtService, LoggerService],
})
export class AuthModule {}
