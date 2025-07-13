import {
  IsEnum,
  IsOptional,
  IsString,
  IsInt,
} from 'class-validator';
import { OrderStatus } from './create-order.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateOrderDto {

  @ApiProperty({required: false,example: 'Nueva nota interna', description: 'Nota interna del pedido'})
  @IsOptional()
  @IsEnum(OrderStatus, {
    message: `El estado debe ser uno de: ${Object.values(OrderStatus).join(', ')}`,
  })
  status?: OrderStatus;

  @ApiProperty({required: false,example: 'Nota interna del pedido', description: 'Nota interna del pedido'})
  @IsOptional()
  @IsString({ message: 'La nota interna debe ser un texto' })
  internalNote?: string;
  
  @ApiProperty({required: false,example: '2023-10-01T10:00:00Z', description: 'Fecha y hora de actualización'})
  @IsOptional()
  @IsString({ message: 'El nombre del cliente debe ser un texto' })
  clientName?: string;
  
  @ApiProperty({required: false,example: 'Problema con la pantalla', description: 'Descripción del problema'})
  @IsOptional()
  @IsString({ message: 'El equipo ingresado debe ser un texto' })
  device?: string;
  
  @ApiProperty({required: false,example: 'Problema con la pantalla', description: 'Descripción del problema'})
  @IsOptional()
  @IsString({ message: 'La descripción debe ser un texto' })
  description?: string;
  
  @ApiProperty({required: false,example: '2023-10-01T10:00:00Z', description: 'Fecha y hora de recepción'})
  @IsOptional()
  @IsString({ message: 'El estado de recepción debe ser un texto' })
  stateAtReception?: string;
  
  @ApiProperty({required: false,example: '123456789', description: 'Número de contacto del cliente'})
  @IsOptional()
  @IsString({ message: 'El medio de contacto debe ser un texto' })
  contact?: string;
  
  @ApiProperty({required: false,example: 'WhatsApp', description: 'Método de notificación preferido'})
  @IsOptional()
  @IsString({ message: 'El método de notificación debe ser un texto' })
  notifyBy?: string;
  
  @ApiProperty({required: false,example: 1, description: 'ID de la empresa'})
  @IsOptional()
  @IsInt({ message: 'El ID del técnico debe ser un número entero' })
  technicianId?: number;
}
