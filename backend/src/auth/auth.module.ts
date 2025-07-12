import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports:[
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret:process.env.JWT_SECRET ,
      signOptions:{expiresIn:process.env.JWT_EXPIRES_IN || '1d'}
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy]
})
export class AuthModule {}
