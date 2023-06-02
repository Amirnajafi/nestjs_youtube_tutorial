import { HttpException, Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import Codes from 'src/entities/codes.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    @InjectRepository(Codes)
    private code_repository: Repository<Codes>,
  ) {}
  async register(registerDto: RegisterDto) {
    const user = await this.usersService.findUserByEmail(registerDto.email);
    if (user) {
      throw new HttpException('User already exists', 400);
    }
    registerDto.password = await bcrypt.hash(registerDto.password, 10);
    return await this.usersService.createUser(registerDto);
  }

  async login(loginDto: LoginDto) {
    const user = await this.usersService.findUserByEmail(loginDto.email);
    if (!user) {
      throw new HttpException('User not found', 404);
    }

    if (loginDto.code) {
      // check if code is exist in database and is valid
      const checkCode = await this.code_repository.findOne({
        where: {
          code: loginDto.code,
          email: loginDto.email,
          is_used: false,
        },
      });
      if (checkCode) {
        await this.code_repository.update(checkCode, { is_used: true });
        const accessToken = this.jwtService.sign({
          sub: user.id,
          email: user.email,
        });
        return {
          access_token: accessToken,
        };
      } else {
        throw new HttpException('code is not valid ', 400);
      }
    } else {
      // generate 5 digit otp code that is not exist in database
      const otp = await this.generateOptCode();
      // save otp code to database
      this.code_repository.save({
        code: otp,
        email: loginDto.email,
      });
      // send opt code to user
      return { code: otp };
    }
  }

  async generateOptCode() {
    // generate 5 gigit code that is not exist in database
    let code: number = null;
    while (!code) {
      const fiveDigitCode = this.getRandomCode();
      const checkCode = await this.code_repository.findOne({
        where: {
          code: fiveDigitCode,
        },
      });
      if (!checkCode) {
        code = fiveDigitCode;
        break;
      }
    }
    return code;
  }

  getRandomCode() {
    const min = 10000;
    const max = 99999;
    const otp = Math.floor(Math.random() * (max - min + 1)) + min;
    return otp;
  }
}
