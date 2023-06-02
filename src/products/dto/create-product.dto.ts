import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
  minLength,
} from 'class-validator';
import Users from 'src/entities/user.entity';
import userGuard from 'src/users/dto/userGuards';
export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  title: string;
  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  description: string;
  @IsNumber()
  @IsOptional()
  price: number;
  @IsOptional()
  user: userGuard;
}
