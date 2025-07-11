import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsInt,
} from 'class-validator';

export enum OrderStatus {
  RECEIVED = 'RECEIVED',
  IN_PROCESS = 'IN_PROCESS',
  READY = 'READY',
  DELIVERED = 'DELIVERED',
}

export class CreateOrderDto {
  @IsNotEmpty({ message: 'El nombre del cliente es obligatorio' })
  @IsString({ message: 'El nombre del cliente debe ser un texto' })
  clientName: string;

  @IsNotEmpty({ message: 'El contacto es obligatorio' })
  @IsString({ message: 'El contacto debe ser un texto' })
  contact: string;

  @IsNotEmpty({ message: 'El método de notificación es obligatorio' })
  @IsString({ message: 'El método de notificación debe ser un texto' })
  notifyBy: string;

  @IsNotEmpty({ message: 'El equipo ingresado es obligatorio' })
  @IsString({ message: 'El equipo ingresado debe ser un texto' })
  device: string;

  @IsNotEmpty({ message: 'La descripción del problema es obligatoria' })
  @IsString({ message: 'La descripción debe ser un texto' })
  description: string;

  @IsNotEmpty({ message: 'El estado al momento de recepción es obligatorio' })
  @IsString({ message: 'El estado de recepción debe ser un texto' })
  stateAtReception: string;

  @IsOptional()
  @IsInt({ message: 'El ID del técnico debe ser un número entero' })
  technicianId?: number;
  
  @IsInt({ message: 'El ID de la empresa debe ser un número entero' })
  companyId: number;

  @IsOptional()
  @IsEnum(OrderStatus, {
    message: `El estado debe ser uno de: ${Object.values(OrderStatus).join(', ')}`,
  })
  status?: OrderStatus = OrderStatus.RECEIVED;
}
