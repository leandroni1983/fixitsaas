'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const registerSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
  name: z.string().min(1, 'El nombre es requerido'),
  role: z.enum(['ADMIN', 'TECHNICIAN']),
  companyId: z.number().min(1, 'Selecciona una empresa'),
});

type RegisterForm = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterForm) => {
    try {
      await axios.post('http://your-backend-url/api/users', data);
      router.push('/auth/login');
    } catch (error) {
      console.error('Error al registrar:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Registro</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Nombre</label>
            <input
              {...register('name')}
              className="w-full p-2 border rounded-md"
              type="text"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              {...register('email')}
              className="w-full p-2 border rounded-md"
              type="email"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium">Contraseña</label>
            <input
              {...register('password')}
              className="w-full p-2 border rounded-md"
              type="password"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium">Rol</label>
            <select {...register('role')} className="w-full p-2 border rounded-md">
              <option value="ADMIN">Admin</option>
              <option value="TECHNICIAN">Técnico</option>
            </select>
            {errors.role && <p className="text-red-500 text-sm">{errors.role.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium">Empresa (ID)</label>
            <input
              {...register('companyId', { valueAsNumber: true })}
              className="w-full p-2 border rounded-md"
              type="number"
            />
            {errors.companyId && <p className="text-red-500 text-sm">{errors.companyId.message}</p>}
          </div>
          <button
            type="submit"
            className="w-full bg-primary text-white p-2 rounded-md hover:bg-blue-700"
          >
            Registrar
          </button>
        </form>
      </div>
    </div>
  );
}