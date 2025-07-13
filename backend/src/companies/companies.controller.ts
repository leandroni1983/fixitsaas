import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-companiy.dto';
import { JwtGuard } from 'src/auth/jwt/jwt.guard';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@UseGuards(JwtGuard)
@ApiBearerAuth() // Agrega el candadito para enviar el JWT
@ApiTags('companies') // para agrupar las rutas de empresas en Swagger
@Controller('companies')
export class CompaniesController {
    constructor(private readonly companiesService: CompaniesService){}
    
    @Post()
    @ApiOperation({ summary: 'Crear una nueva empresa' })
    @ApiResponse({ status: 201, description: 'Empresa creada exitosamente' })
    @ApiResponse({ status: 400, description: 'Datos inválidos' })
    @ApiResponse({ status: 401, description: 'No autorizado' })
    create(@Body() dto: CreateCompanyDto){
        return this.companiesService.create(dto)
    }
    @Get()
    @ApiOperation({ summary: 'Obtener todas las empresas' })
    @ApiResponse({ status: 200, description: 'Lista de empresas obtenida exitosamente', type: [CreateCompanyDto] })
    @ApiResponse({ status: 404, description: 'No se encontraron empresas' })
    @ApiResponse({ status: 401, description: 'No autorizado' })
    findAll(){
        return this.companiesService.findAll()
    }
    @Get(':id')
    @ApiOperation({ summary: 'Obtener una empresa por ID' })
    @ApiResponse({ status: 200, description: 'Empresa encontrada exitosamente',  type: CreateCompanyDto })
    @ApiResponse({ status: 404, description: 'Empresa no encontrada' })
    @ApiResponse({ status: 401, description: 'No autorizado' })
    findOne(@Param('id') id:string){
        return this.companiesService.findOne(+id)
    }
}
