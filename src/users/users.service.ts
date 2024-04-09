import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from "argon2";


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository : Repository<User>,
    private readonly jwtService: JwtService,
  ){}

  async create(createUserDto: CreateUserDto) {
    const {id, name, username, email, password} = createUserDto;
    const hashPassword = await argon2.hash(password);
    await this.userRepository.save({name, username, email, password : hashPassword});
    const token = this.jwtService.sign({id, name, email});
    return {access_token :token};
  }

  async logIn(payload:any){
    const user = await this.userRepository.findOne({where:{username:payload.username}})
    //console.log(user);
    if(!user) return "Username is incorrect Please Enter the correct username";
    const match = await argon2.verify(user.password, payload.password);
    if(match){
      const {username, password, ...rest} = user;
      return {access_token : this.jwtService.sign(rest)};
    }
    return "Password is incorrect Please Enter the correct Password"
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(username:string){
    return this.userRepository.findOne({where:{username}})
  }

  findOneBy(id: string){
    return this.userRepository.findOneBy({id})
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(id, updateUserDto)
  }

  remove(id: string) {
    return this.userRepository.delete(id);
  }
}