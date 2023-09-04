import { Test, TestingModule } from '@nestjs/testing';
import { FoodPosController } from './food-pos.controller';
import { FoodPosService } from './food-pos.service';

describe('FoodPosController', () => {
  let controller: FoodPosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FoodPosController],
      providers: [FoodPosService],
    }).compile();

    controller = module.get<FoodPosController>(FoodPosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
