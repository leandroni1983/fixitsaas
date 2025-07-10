import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

    async findAll(){
      return this.prisma.user.findMany()
  }


  async create(data: { email: string; name: string; password: string; role?: 'ADMIN' | 'TECHNICIAN';companyId: number; }) {
    try {
      return await this.prisma.user.create({ data });
    } catch (error) {
     if (
        error instanceof PrismaClientKnownRequestError && error.code === 'P2002'
     ){
        const target = error.meta?.target
        if(Array.isArray(target) && target.includes('email')){
            throw new ConflictException('El mail ya se encuentra registrado')
        }
    }
      throw error;
    }
  }


}