import { Module } from '@nestjs/common';
import { FoodPosService } from './food-pos.service';
import { FoodPosController } from './food-pos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FoodCategories } from './entities/food.categories.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FoodCategories])],
  controllers: [FoodPosController],
  providers: [FoodPosService],
})
export class FoodPosModule {}
