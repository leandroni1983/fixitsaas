import { Injectable,UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import  { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  async validateuser(email:string, password:string): Promise<any>{
    const user = await this.usersService.findByEmail(email);
    if(!user){
        throw new UnauthorizedException('Credenciales incorrectas ')
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if(!passwordMatch){
        throw new UnauthorizedException('Credenciales incorrectas')
    }
    return user;
  }

   async login(user: User): Promise<string> {
    const payload = {
      sub: user.id,
      mail: user.email, //agregaste esto 20/7 1:19
      role: user.role,
      companyId: user.companyId,
      name: user.name,
    };
    return  this.jwtService.sign(payload)

}

}