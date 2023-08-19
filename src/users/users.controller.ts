import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiResponseDetail } from '../@constants/api-reponse-options.constant';
import { interResponceApi } from 'src/@types';
import { User } from './entities/user.entity';

//-- instant variable --//
const CONTROLLER_NAME = 'users';

@ApiTags(CONTROLLER_NAME.toLocaleUpperCase())
@Controller(CONTROLLER_NAME)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  async findAll() : Promise<interResponceApi<User[]>> {
    const [data, total] = await this.usersService.findAll();
    return {
      status: true,
      total: total, 
      data: data
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
