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
import { ApiHeader, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiResponseDetail } from 'src/@constants/api-reponse-options.constant';

//-- instant variable --//
const CONTROLLER_NAME = 'users';

@ApiHeader({
  name: 'X-MyHeader',
  description: 'Custom header',
})
@ApiTags(CONTROLLER_NAME)
@Controller(CONTROLLER_NAME)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/sign-up')
  @ApiResponse(ApiResponseDetail(201))
  async getSignUp(@Body() createUserDto: CreateUserDto) {
    return this.usersService.actionSignUp(createUserDto);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    //return this.usersService.findAll();
    return process.env;
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
