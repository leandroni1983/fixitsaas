import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtGuard } from 'src/auth/jwt/jwt.guard';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateAdminDto } from './dto/create-admin.dto.specs';


@ApiTags('users') // para agrupar las rutas de usuarios en Swagger
@Controller('users') // todas las rutas comienzan con /users
export class UsersController {
    constructor(private readonly usersService: UsersService){}
    
    @UseGuards(JwtGuard)
        @Get()
            @ApiOperation({ summary: 'Obtener todos los usuarios' })
            @ApiResponse({
                status: 200,
                description: 'Lista de usuarios obtenida exitosamente',
                type: [CreateUserDto], // Asumiendo que CreateUserDto es el DTO
            })
            async getAll() {
                return this.usersService.findAll();
            }
            
    @UseGuards(JwtGuard)
        @Post()
            @ApiOperation({ summary: 'Crear un nuevo usuario' })
            @ApiBody({ type: CreateUserDto })
            @ApiResponse({ status: 201, description: 'Usuario creado exitosamente.' })
            async create(@Body() createUserDto: CreateUserDto){
                return this.usersService.create(createUserDto)
            }
    
    @UseGuards(JwtGuard)
        @Get('profile')
            @ApiBearerAuth() // Agrega el candadito para enviar el JWT
            @ApiOperation({ summary: 'Obtener el perfil del usuario autenticado' })
            @ApiResponse({ status: 200, description: 'Datos del usuario autenticado' })
            async getProfile(@Req() req){
                return req.user;
            }

        @Post('register-admin')
            @ApiOperation({ summary: 'Registrar un nuevo administrador' })
            @ApiBody({ type: CreateAdminDto })
            @ApiResponse({ status: 201, description: 'Administrador registrado exitosamente.' })
            async registerAdmin(@Body() dto: CreateAdminDto) {
                return this.usersService.registerAdmin(dto);
             }


}
