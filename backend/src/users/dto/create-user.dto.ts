import { IsEmail,IsString,IsOptional, IsEnum, MinLength, IsInt} from "class-validator";


enum UserRole {
  ADMIN = 'ADMIN',
  TECHNICIAN = 'TECHNICIAN',
}

export class CreateUserDto {

    @IsEmail({},{message:"Dene ser im correo electronico valido"})
    email:string;

    @IsString({message:"El nombre debe ser una cadena de texto"})
    @MinLength(2,{message:"El nombre debe tener al menos 2 caracteres"})
    name: string;

    @IsString({message:"El password debe ser una cadena de texto"})
    @MinLength(8,{message:"El password debe tener al menos 8 caracteres"})
    password: string;

    @IsInt({message: 'El ID de la empresa debe ser un numero entero'})
    companyId: number;

    @IsOptional()
    @IsEnum(UserRole,{
        message: "El rol debe ser ADMIN o TECHNICIAN",
    })
    role?: UserRole;
}
