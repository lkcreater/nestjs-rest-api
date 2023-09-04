import { Test, TestingModule } from '@nestjs/testing';
import { FoodPosService } from './food-pos.service';

describe('FoodPosService', () => {
  let service: FoodPosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FoodPosService],
    }).compile();

    service = module.get<FoodPosService>(FoodPosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
