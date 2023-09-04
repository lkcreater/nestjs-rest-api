import { Injectable } from '@nestjs/common';
import { CreateFoodPoDto } from './dto/create-food-po.dto';
import { UpdateFoodPoDto } from './dto/update-food-po.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FoodCategories } from './entities/food.categories.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FoodPosService {
  constructor(
    @InjectRepository(FoodCategories) private repoFoodCate: Repository<FoodCategories>,
  ) {}

  create(createFoodPoDto: CreateFoodPoDto) {
    return 'This action adds a new foodPo';
  }

  findAll() {
    return `This action returns all foodPos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} foodPo`;
  }

  update(id: number, updateFoodPoDto: UpdateFoodPoDto) {
    return `This action updates a #${id} foodPo`;
  }

  remove(id: number) {
    return `This action removes a #${id} foodPo`;
  }
}
