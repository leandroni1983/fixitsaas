import z from "zod";

// Esquema de validación con Zod
// Este esquema define los campos requeridos para el registro de usuarios y administradores
// y utiliza discriminated unions para manejar los diferentes roles.
// El campo 'role' determina si el usuario es un ADMIN o un TECHNICIAN,
// y los campos requeridos cambian en consecuencia.
// Si el rol es ADMIN, se requiere 'companyName' y no 'companyId',
// mientras que si el rol es TECHNICIAN, se requiere 'companyId' y no 'companyName'.
// Esto permite una validación clara y específica según el tipo de usuario que se está registrando
// y asegura que los datos enviados al servidor sean correctos y completos.
const registerSchema = z.discriminatedUnion('role', [
  z.object({
    role: z.literal('ADMIN'),
    email: z.string().email('Email inválido'),
    password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
    name: z.string().min(1, 'El nombre es requerido'),
    companyName: z.string().min(1, 'El nombre de la empresa es requerido'),
  }),
  z.object({
    role: z.literal('TECHNICIAN'),
    email: z.string().email('Email inválido'),
    password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
    name: z.string().min(1, 'El nombre es requerido'),
    companyId: z.number().min(1, 'Selecciona una empresa'),
  }),
]);

export default registerSchema;