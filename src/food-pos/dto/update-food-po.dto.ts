import { PartialType } from '@nestjs/swagger';
import { CreateFoodPoDto } from './create-food-po.dto';

export class UpdateFoodPoDto extends PartialType(CreateFoodPoDto) {}
