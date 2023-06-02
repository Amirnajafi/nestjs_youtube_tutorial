import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import Users from 'src/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import Codes from 'src/entities/codes.entity';

@Module({
  imports: [
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '1d' },
    }),
    TypeOrmModule.forFeature([Users, Codes]),
  ],
  controllers: [AuthController],
  providers: [AuthService, UsersService, JwtStrategy],
})
export class AuthModule {}
