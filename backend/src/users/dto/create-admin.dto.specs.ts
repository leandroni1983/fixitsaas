// users/dto/create-admin.dto.ts
import { IsString, IsEmail, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class CreateAdminDto {
  @ApiProperty({
    example: ' Jose Lopez',
    description: 'Nombre completo del administrador',
  }) 
  @IsString()
  name: string;

  @ApiProperty({
    example: 'AdminTecnico@iFixit.com',
    description: 'Correo electrónico del administrador',
  })
  @IsEmail({}, { message: 'Debe ser un correo electrónico válido' })
  email: string;

  @ApiProperty({
      example: 'AdminPassw0rd!',
      description: 'Contraseña segura del administrador (mín. 8 caracteres)',
  })
  @MinLength(8)
  password: string;

    @ApiProperty({
        example: 'iFixit',
        description: 'Nombre de la empresa a la que pertenece el administrador',
    })  
  @IsString()
  companyName: string;
}
