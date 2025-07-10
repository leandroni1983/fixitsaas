import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-companiy.dto';

@Controller('companies')
export class CompaniesController {
    constructor(private readonly companiesService: CompaniesService){}
    
    @Post()
    create(@Body() dto: CreateCompanyDto){
        return this.companiesService.create(dto)
    }
    @Get()
    findAll(){
        return this.companiesService.findAll()
    }
    @Get(':id')
    findOne(@Param('id') id:string){
        return this.companiesService.findOne(+id)
    }
}
