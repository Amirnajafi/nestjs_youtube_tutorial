import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class LoginDto {
  @IsEmail()
  email: string;
  @IsOptional()
  code: number;
}
