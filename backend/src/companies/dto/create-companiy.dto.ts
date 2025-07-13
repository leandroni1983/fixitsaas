import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty,IsString } from "class-validator";

export class CreateCompanyDto{
    @ApiProperty({
        description: 'Nombre de la empresa',
        example: 'Tech Solutions',
        required: true,
    })
    @IsNotEmpty({message:"El nombre de la empresa es obligatorio"})
    @IsString({message:'El nombre debe ser un texto'})
    name:string;
}