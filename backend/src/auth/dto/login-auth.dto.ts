import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty,IsEmail, MinLength } from "class-validator";

export class LoginAuthDto {
    @ApiProperty({
        description: 'E-mail del usuario',
        example: 'tecnico1@fixit.com',
        required: true,
    })
    @IsEmail({},{message: 'El E-mail no es valido'})
    email:string;

    @ApiProperty({
        description: 'Contraseña del usuario',
        example: 'Fixit123!',
        required: true,
    })  
    @IsNotEmpty({message:'La contraseña es obligatoria'})
    @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
    password:string;
}