import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { UsersEntity } from 'src/users/usersEntity';
import {compareSync} from 'bcrypt'
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
    constructor (
        private readonly userService:UsersService,
        private readonly jwtService:JwtService
        ) {}
  async login(user: any) {
    const payload = {
        sub: user.id, 
        email: user.email
    }
     return {
        acess_token: await this.jwtService.sign(payload), 
    }
  }
   async validateUser(email: string, password: string) {
    let user:UsersEntity
    try {
        user = await this.userService.findByEmail(email)  
    } catch (error) {
        return null   
    }
    
       const isPasswordValid = compareSync(password, user.password);
       if(!isPasswordValid) return null
       return user;
    }
}
