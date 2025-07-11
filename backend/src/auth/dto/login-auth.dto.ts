import { IsNotEmpty,IsEmail, MinLength } from "class-validator";

export class LoginAuthDto {

    @IsEmail({},{message: 'El E-mail no es valido'})
    email:string;

    @IsNotEmpty({message:'La contraseña es obligatoria'})
    @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
    password:string;
}