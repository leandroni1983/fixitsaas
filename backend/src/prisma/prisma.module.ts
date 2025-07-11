import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';


@Module({
    providers:[PrismaService], //Declaramos PrismaService
    exports:[PrismaService],  // Lo hacemos disponible fuera del modulo 
})

export class PrismaModule {}
