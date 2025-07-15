'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { registerAdmin, registerUser } from '@/app/lib/api';
import registerSchema from './registerschema';


// Tipo inferido del esquema de validación
type RegisterForm = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  const watchRole = watch('role');

  const onSubmit = async (data: RegisterForm) => {
    try {
      if (data.role === 'ADMIN') {
        const adminPayload = {
          email: data.email,
          password: data.password,
          name: data.name,
          companyName: data.companyName,
        };
        // Enviar datos de registro de administrador
        await registerAdmin(adminPayload);
      } else {
        await registerUser(data);
      }
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
            <input {...register('name')} className="w-full p-2 border rounded-md" type="text" />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input {...register('email')} className="w-full p-2 border rounded-md" type="email" />
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

          {watchRole === 'ADMIN' ? (
            <div>
              <label className="block text-sm font-medium">Nombre de la empresa</label>
              <input
                {...register('companyName')}
                className="w-full p-2 border rounded-md"
                type="text"
              />
              {'companyName' in errors && errors.companyName && (
                <p className="text-red-500 text-sm">{errors.companyName.message}</p>
              )}
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium">Empresa (ID)</label>
              <input
                {...register('companyId', { valueAsNumber: true })}
                className="w-full p-2 border rounded-md"
                type="number"
              />
              {'companyId' in errors && errors.companyId && (
                <p className="text-red-500 text-sm">{errors.companyId?.message}</p>
              )}
            </div>
          )}

          <button
            type="submit"
            className="w-full  text-white p-2 rounded-md bg-blue-800 hover:bg-blue-600 transition-colors"
          >
            Registrar
          </button>
        </form>
      </div>
    </div>
  );
}