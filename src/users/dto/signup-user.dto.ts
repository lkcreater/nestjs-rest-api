import { IsNotEmpty } from "class-validator";
import { CreateUserDto } from "./create-user.dto";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class SignupUserDto extends CreateUserDto {
    @ApiProperty()
    @IsNotEmpty()
    firstName: string;

    @ApiProperty()
    @IsNotEmpty()
    lastName: string;

    @ApiPropertyOptional()
    @IsNotEmpty()
    phone: string;
}