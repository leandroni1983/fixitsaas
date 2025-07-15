import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAdminDto } from './dto/create-admin.dto.specs';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

    async findAll(){
      return this.prisma.user.findMany(
        {
          select: {
            id: true,
            email: true,
            name: true,
            role: true,
            companyId: true,
            createdAt: true,
            updatedAt: true,
          },
        }
      )

    }


    async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  // Método para crear un usuario
  /**
   * Crea un nuevo usuario en la base de datos.
   * @param data - Datos del usuario a crear.
   * @returns El usuario creado.
   */
  //{ email: string; name: string; password: string; role?: 'ADMIN' | 'TECHNICIAN';companyId: number; }
  async create(data: CreateUserDto) {
    try {
       const hashedPassword = await bcrypt.hash(data.password, 10);
      return await this.prisma.user.create({ data:{
        ...data,
        password:hashedPassword
      } });
    } catch (error) {
     if (
        error instanceof PrismaClientKnownRequestError && error.code === 'P2002'
     ){
        const target = error.meta?.target
        if(Array.isArray(target) && target.includes('email')){
            throw new ConflictException('El mail ya se encuentra registrado')
        }
    }
      throw error;
    }
  }

  // Método para registrar un administrador y crear una empresa
  /**
   * Registra un nuevo administrador y crea una empresa asociada.
   * @param dto - Datos del administrador a registrar.
   * @returns Mensaje de éxito y datos del usuario creado.
   */
async registerAdmin(dto: CreateAdminDto) {
    const { email, password, name, companyName } = dto;

    // Verificamos si el email ya está en uso
    const existingUser = await this.prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      throw new ConflictException('El email ya está en uso');
    }

    // Verificamos si la empresa ya existe (opcional, según lo que quieras hacer)
    const existingCompany = await this.prisma.company.findUnique({
      where: { name: companyName },
    });

    if (existingCompany) {
      throw new ConflictException('Ya existe una empresa con ese nombre');
    }

    // Creamos la empresa
    const company = await this.prisma.company.create({
      data: {
        name: companyName,
      },
    });

    // Hasheamos la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Creamos el usuario administrador
    const adminUser = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: 'ADMIN',
        companyId: company.id,
      },
    });

    return {
      message: 'Administrador y empresa creados exitosamente',
      user: {
        id: adminUser.id,
        email: adminUser.email,
        name: adminUser.name,
        company: company.name,
      },
    };
  }

}