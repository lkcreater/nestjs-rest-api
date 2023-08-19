import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiResponseDetail } from '../@constants/api-reponse-options.constant';
import { interDecoratorLogger, interResponceApi } from 'src/@types';
import { User } from './entities/user.entity';
import { LoggerService } from 'src/logger/logger.service';
import { Logge } from 'src/logger/logger.decorator';

//-- instant variable
const CONTROLLER_NAME = 'users';

@ApiTags(CONTROLLER_NAME.toLocaleUpperCase())
@Controller(CONTROLLER_NAME)
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly logger: LoggerService,
  ) {}

  @Get()
  @ApiResponse(ApiResponseDetail(200))
  async findAll(): Promise<interResponceApi<User[]>> {
    const [data, total] = await this.usersService.findAll();
    return {
      status: true,
      total: total,
      data: data,
    };
  }

  @Get(':uuid_token')
  async findOne(
    @Logge() log: interDecoratorLogger,
    @Param('uuid_token') uuid_token: string,
  ): Promise<interResponceApi<User>> {
    try {
      const data = await this.usersService.findOneByToken(uuid_token);
      return {
        status: true,
        data: data,
      };
    } catch (error) {
      this.logger.error(error, {
        origin: log,
        data: [error],
      });
      throw new NotFoundException();
    }
  }
}
