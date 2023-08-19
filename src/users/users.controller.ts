import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiResponseDetail } from '../@constants/api-reponse-options.constant';
import { interResponceApi } from 'src/@types';
import { User } from './entities/user.entity';
import { LoggerService } from 'src/logger/logger.service';

//-- instant variable
const CONTROLLER_NAME = 'users';

@ApiTags(CONTROLLER_NAME.toLocaleUpperCase())
@Controller(CONTROLLER_NAME)
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly logger: LoggerService,
  ) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return 'this.usersService.create(createUserDto)';
  }

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
    @Param('uuid_token') uuid_token: string,
  ): Promise<interResponceApi<User>> {
    try {
      const data = await this.usersService.findOneByToken(uuid_token);
      return {
        status: true,
        data: data,
      };
    } catch (error) {
      this.logger.error(error);
      throw new NotFoundException();
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return 'this.usersService.update(+id, updateUserDto)';
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return 'this.usersService.remove(+id)';
  }
}
