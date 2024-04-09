import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt';
require('dotenv').config();

@Module({
  imports:[TypeOrmModule.forFeature([User]), 
  JwtModule.register({
    secretOrPrivateKey : process.env.JWT_SECRET, 
    signOptions:{expiresIn:'60s'}
  })],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
