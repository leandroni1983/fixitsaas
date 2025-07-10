import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

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
    
}
