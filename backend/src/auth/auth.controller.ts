import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService:AuthService){}

    @Post('login')
    async login(@Body() loginDto: LoginAuthDto){
        const user = await this.authService.validateuser(loginDto.email,loginDto.password)
        return this.authService.login(user)
    }

    
}
