import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { OrdersModule } from './orders/orders.module';
import { CompaniesModule } from './companies/companies.module';

@Module({
  imports: [PrismaModule, UsersModule, OrdersModule, CompaniesModule], // lo importamos 
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
