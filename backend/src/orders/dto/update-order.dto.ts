import {
  IsEnum,
  IsOptional,
  IsString,
  IsInt,
} from 'class-validator';
import { OrderStatus } from './create-order.dto';

export class UpdateOrderDto {
  @IsOptional()
  @IsEnum(OrderStatus, {
    message: `El estado debe ser uno de: ${Object.values(OrderStatus).join(', ')}`,
  })
  status?: OrderStatus;

  @IsOptional()
  @IsString({ message: 'La nota interna debe ser un texto' })
  internalNote?: string;

  @IsOptional()
  @IsString({ message: 'El nombre del cliente debe ser un texto' })
  clientName?: string;

  @IsOptional()
  @IsString({ message: 'El equipo ingresado debe ser un texto' })
  device?: string;

  @IsOptional()
  @IsString({ message: 'La descripción debe ser un texto' })
  description?: string;

  @IsOptional()
  @IsString({ message: 'El estado de recepción debe ser un texto' })
  stateAtReception?: string;

  @IsOptional()
  @IsString({ message: 'El medio de contacto debe ser un texto' })
  contact?: string;

  @IsOptional()
  @IsString({ message: 'El método de notificación debe ser un texto' })
  notifyBy?: string;

  @IsOptional()
  @IsInt({ message: 'El ID del técnico debe ser un número entero' })
  technicianId?: number;
}
