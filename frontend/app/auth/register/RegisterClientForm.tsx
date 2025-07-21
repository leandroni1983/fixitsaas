'use client';

import { Resolver, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const formSchema = z.object({
  name: z.string().min(1, 'Nombre obligatorio'),
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Mínimo 6 caracteres'),
  role: z.enum(['TECHNICIAN', 'ADMIN']),
  companyId: z.coerce.number().optional(),
  companyName: z.string().optional(),
});

type RegisterForm = z.infer<typeof formSchema>;

type Props = {
  companies: { id: number; name: string }[];
};

export default function RegisterClientForm({ companies }: Props) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(formSchema) as Resolver<RegisterForm>,
    defaultValues: {
      role: 'TECHNICIAN',
    },
  });

  const role = watch('role');
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: RegisterForm) => {
    setLoading(true);
    try {
      const endpoint = data.role === 'ADMIN' ? '/auth/register-admin' : '/auth/register';

      const payload =
        data.role === 'ADMIN'
          ? {
              email: data.email,
              password: data.password,
              name: data.name,
              companyName: data.companyName,
            }
          : {
              email: data.email,
              password: data.password,
              name: data.name,
              companyId: data.companyId,
              role: 'TECHNICIAN',
            };

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || 'Error en el registro');
      }

      router.push('/auth/login');
    } catch (error) {
      console.error('Error al registrar:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Registro</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label>Nombre</label>
          <input {...register('name')} className="input" />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>

        <div>
          <label>Email</label>
          <input type="email" {...register('email')} className="input" />
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        </div>

        <div>
          <label>Contraseña</label>
          <input type="password" {...register('password')} className="input" />
          {errors.password && <p className="text-red-500">{errors.password.message}</p>}
        </div>

        <div>
          <label>Rol</label>
          <select {...register('role')} className="input">
            <option value="TECHNICIAN">Técnico</option>
            <option value="ADMIN">Administrador</option>
          </select>
        </div>

        {role === 'TECHNICIAN' && (
          <div>
            <label>Empresa</label>
            <select {...register('companyId')} className="input">
              <option value="">Selecciona una empresa</option>
              {companies.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
            {errors.companyId && <p className="text-red-500">{errors.companyId.message}</p>}
          </div>
        )}

        {role === 'ADMIN' && (
          <div>
            <label>Nombre de la Empresa</label>
            <input {...register('companyName')} className="input" />
            {errors.companyName && <p className="text-red-500">{errors.companyName.message}</p>}
          </div>
        )}

        <button type="submit" disabled={loading} className="btn-primary">
          {loading ? 'Registrando...' : 'Registrarse'}
        </button>
      </form>
    </div>
  );
}
