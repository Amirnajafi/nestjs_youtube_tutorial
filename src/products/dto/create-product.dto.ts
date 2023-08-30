import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import Users from 'src/entities/user.entity';
import userGuard from 'src/users/dto/userGuards';
export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The title of the product',
    minLength: 10,
    maxLength: 50,
    example: 'This is Products one',
    default: '',
  })
  title: string;
  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  @ApiProperty({
    description: 'The description of the product',
    minLength: 20,
    maxLength: 1500,
    example: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  })
  description: string;
  @IsNumber()
  @IsOptional()
  @ApiProperty({
    description: 'The title of the product',
    minimum: 0,
    maximum: 100000,
    example: 2500,
    default: 0,
  })
  price: number;

  @ApiProperty({
    description: 'this is list of users',
    type: 'array',
    items: {
      type: 'string',
    },
  })
  users: number;

  @ApiProperty({
    description: 'this product type',
    enum: ['type1', 'type2', 'type3'],
  })
  type: string;
  @IsOptional()
  user: userGuard;
}
