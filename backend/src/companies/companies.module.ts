import { forwardRef, Module } from '@nestjs/common';
import { CompaniesController } from './companies.controller';
import { CompaniesService } from './companies.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [CompaniesController],
  providers: [CompaniesService],
  imports:[PrismaModule,forwardRef(() => AuthModule)],
})
export class CompaniesModule {}
