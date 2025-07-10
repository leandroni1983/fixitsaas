import { IsNotEmpty,IsString } from "class-validator";

export class CreateCompanyDto{
    @IsNotEmpty({message:"El nombre de la empresa es obligatorio"})
    @IsString({message:'El nombre debe ser un texto'})
    name:string;
}