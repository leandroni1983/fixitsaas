import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth() // Agrega el candadito para enviar el JWT
@ApiTags('auth') // para agrupar las rutas de autenticación en Swagger
@Controller('auth')
export class AuthController {
    constructor(private readonly authService:AuthService){}

    @Post('login') // Ruta para iniciar sesión
    @ApiOperation({ summary: 'Iniciar sesión' })
    @ApiBody({ type: LoginAuthDto })
    @ApiResponse({ status: 200, description: 'Inicio de sesión exitoso' })
    @ApiResponse({ status: 400, description: 'Credenciales inválidas' })
    async login(@Body() loginDto: LoginAuthDto){
        const user = await this.authService.validateuser(loginDto.email,loginDto.password)
        return this.authService.login(user)
    }

    
}
