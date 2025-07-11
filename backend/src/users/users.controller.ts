import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtGuard } from 'src/auth/jwt/jwt.guard';

@Controller('users') // todas las rutas comienzan con /users
export class UsersController {
    constructor(private readonly usersService: UsersService){}

    @Get()
    async getAll() {
        return this.usersService.findAll();
    }

    @Post()
    async create(@Body() createUserDto: CreateUserDto){
        return this.usersService.create(createUserDto)
    }
    
    @UseGuards(JwtGuard)
    @Get('profile')
    getProfile(@Req() req){
        return req.user;
    }
}
