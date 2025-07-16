import { z } from 'zod';

// Esquema base para campos comunes
const baseUserSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres'),
});

// Esquema para login
export const loginSchema = baseUserSchema;

// Esquema para registro con discriminated union
export const registerSchema = z.discriminatedUnion('role', [
  baseUserSchema.extend({
    role: z.literal('ADMIN'),
    name: z.string().min(1, 'El nombre es requerido'),
    companyName: z.string().min(1, 'El nombre de la empresa es requerido'),
  }),
  baseUserSchema.extend({
    role: z.literal('TECHNICIAN'),
    name: z.string().min(1, 'El nombre es requerido'),
    companyId: z.number().min(1, 'Selecciona una empresa'),
  }),
]);

// Tipos derivados
export type LoginForm = z.infer<typeof loginSchema>;
export type RegisterForm = z.infer<typeof registerSchema>;