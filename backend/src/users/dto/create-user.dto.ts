import { ApiProperty } from "@nestjs/swagger";
import { IsEmail,IsString,IsOptional, IsEnum, MinLength, IsInt} from "class-validator";


enum UserRole {
  ADMIN = 'ADMIN',
  TECHNICIAN = 'TECHNICIAN',
}


export class CreateUserDto {
  @ApiProperty({
    example: 'tecnico1@fixit.com',
    description: 'Correo electrónico del usuario',
  })
  @IsEmail({}, { message: 'Debe ser un correo electrónico válido' })
  email: string;

  @ApiProperty({
    example: 'Ana Gómez',
    description: 'Nombre completo del usuario',
  })
  @IsString({ message: 'El nombre debe ser texto' })
  @MinLength(2, { message: 'Al menos 2 caracteres' })
  name: string;

  @ApiProperty({
    example: 'Passw0rd!',
    description: 'Contraseña segura (mín. 8 caracteres)',
  })
  @IsString({ message: 'El password debe ser texto' })
  @MinLength(8, { message: 'Al menos 8 caracteres' })
  password: string;

  @ApiProperty({
    example: 1,
    description: 'ID de la empresa a la que pertenece el usuario',
  })
  @IsInt({ message: 'El ID de la empresa debe ser un número' })
  companyId: number;

  @ApiProperty({
    example: 'TECHNICIAN',
    enum: UserRole,
    description: 'Rol del usuario (opcional)',
    required: false,
  })
  @IsOptional()
  @IsEnum(UserRole, { message: 'El rol debe ser ADMIN o TECHNICIAN' })
  role?: UserRole;
}
