import { z } from 'zod';

export const orderSchema = z.object({
  clientName: z.string().min(1, 'El nombre del cliente es obligatorio'),
  contact: z.string().min(1, 'El contacto es obligatorio'),
  notifyBy: z.string().min(1, 'El medio de notificación es obligatorio'),
  device: z.string().min(1, 'El equipo ingresado es obligatorio'),
  description: z.string().min(1, 'La descripción es obligatoria'),
  stateAtReception: z.coerce.date()
    .refine(date => !isNaN(date.getTime()), {
      message: 'Debes ingresar una fecha válida',
    }),
  status: z.enum(['RECEIVED', 'IN_PROCESS', 'READY', 'DELIVERED']).default('RECEIVED'),
});

export type OrderForm = z.infer<typeof orderSchema>;
