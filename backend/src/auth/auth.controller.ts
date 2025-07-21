import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@ApiBearerAuth() // Agrega el candadito para enviar el JWT
@ApiTags('auth') // para agrupar las rutas de autenticación en Swagger
@Controller('auth')
export class AuthController {
    constructor(private readonly authService:AuthService){}

    @Post('login')
    async login(
      @Body() dto: LoginAuthDto,
      @Res({ passthrough: true }) res: Response
    ) {
      const user = await this.authService.validateuser(dto.email,dto.password);
      const token = await this.authService.login(user);
      
      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 días
      });

      return { message: 'Login exitoso' };

    }

    @Post('logout')
      logout(@Res({ passthrough: true }) res: Response) {
      res.clearCookie('token');
      return { message: 'Logout exitoso' };
    }

    }


