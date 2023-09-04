import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FoodPosService } from './food-pos.service';
import { CreateFoodPoDto } from './dto/create-food-po.dto';
import { UpdateFoodPoDto } from './dto/update-food-po.dto';

@Controller('food-pos')
export class FoodPosController {
  constructor(private readonly foodPosService: FoodPosService) {}

  @Post()
  create(@Body() createFoodPoDto: CreateFoodPoDto) {
    return this.foodPosService.create(createFoodPoDto);
  }

  @Get()
  findAll() {
    return this.foodPosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.foodPosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFoodPoDto: UpdateFoodPoDto) {
    return this.foodPosService.update(+id, updateFoodPoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.foodPosService.remove(+id);
  }
}
