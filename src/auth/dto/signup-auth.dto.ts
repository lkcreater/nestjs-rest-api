import { IsNotEmpty } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { CreateUserDto } from "src/users/dto/create-user.dto";

export class SignupAuthDto extends CreateUserDto {
    @ApiProperty()
    @IsNotEmpty()
    first_name: string;

    @ApiProperty()
    @IsNotEmpty()
    last_name: string;

    @ApiPropertyOptional()
    @IsNotEmpty()
    phone: string;
}