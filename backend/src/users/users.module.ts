import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtGuard } from 'src/auth/jwt/jwt.guard';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    exports:[UsersService],
    imports: [ forwardRef(() => AuthModule)
    ,PrismaModule],
    providers:[UsersService, JwtStrategy],
    controllers: [UsersController],
})



export class UsersModule {}
