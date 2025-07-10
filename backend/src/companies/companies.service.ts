import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCompanyDto } from './dto/create-companiy.dto';

@Injectable()
export class CompaniesService {
    constructor(private prisma: PrismaService){}

    async create(dto:CreateCompanyDto){
        return this.prisma.company.create({
            data:{
                ...dto
            },
        });
    }

    async findAll(){
        return this.prisma.company.findMany()
    }

    async findOne(id: number){
        return this.prisma.company.findUnique({
            where:{id}
        });
    };
}
