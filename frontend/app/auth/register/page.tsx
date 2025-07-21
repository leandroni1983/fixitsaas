// 'use client';

// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { z } from 'zod';
// import { useRouter } from 'next/navigation';
// import { useState } from 'react';
// import { registerUser, registerAdmin } from '@/app/lib/api';

// const formSchema = z.object({
//   name: z.string().min(1, 'Nombre obligatorio'),
//   email: z.string().email('Email inválido'),
//   password: z.string().min(6, 'Mínimo 6 caracteres'),
//   role: z.enum(['ADMIN', 'TECHNICIAN']),
//   companyId: z.coerce.number().optional(), // para TECHNICIAN
//   companyName: z.string().optional(), // para ADMIN
// });

// type RegisterForm = z.infer<typeof formSchema>;

// export default function RegisterPage() {
//   const {
//     register,
//     handleSubmit,
//     watch,
//     formState: { errors },
//   } = useForm<RegisterForm>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       role: 'TECHNICIAN',
//     },
//   });

//   const router = useRouter();
//   const [loading, setLoading] = useState(false);
//   const role = watch('role');

//   const onSubmit = async (data: RegisterForm) => {
//     setLoading(true);
//     try {
//       if (data.role === 'ADMIN') {
//         const adminPayload = {
//           email: data.email,
//           password: data.password,
//           name: data.name,
//           companyName: data.companyName!,
//         };
//         await registerAdmin(adminPayload);
//       } else {
//         const userPayload = {
//           email: data.email,
//           password: data.password,
//           name: data.name,
//           companyId: data.companyId!,
//           role: 'TECHNICIAN',
//         };
//         await registerUser(userPayload);
//       }

//       router.push('/auth/login');
//     } catch (err) {
//       console.error('Error al registrar:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto p-6">
//       <h1 className="text-2xl font-bold mb-4">Registro de Usuario</h1>
//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//         <div>
//           <label>Nombre</label>
//           <input {...register('name')} className="input" />
//           {errors.name && <p className="text-red-500">{errors.name.message}</p>}
//         </div>

//         <div>
//           <label>Email</label>
//           <input type="email" {...register('email')} className="input" />
//           {errors.email && <p className="text-red-500">{errors.email.message}</p>}
//         </div>

//         <div>
//           <label>Contraseña</label>
//           <input type="password" {...register('password')} className="input" />
//           {errors.password && <p className="text-red-500">{errors.password.message}</p>}
//         </div>

//         <div>
//           <label>Rol</label>
//           <select {...register('role')} className="input">
//             <option value="TECHNICIAN">Técnico</option>
//             <option value="ADMIN">Administrador</option>
//           </select>
//         </div>

//         {role === 'TECHNICIAN' && (
//           <div>
//             <label>ID de Empresa</label>
//             <input type="number" {...register('companyId')} className="input" />
//             {errors.companyId && <p className="text-red-500">{errors.companyId.message}</p>}
//           </div>
//         )}

//         {role === 'ADMIN' && (
//           <div>
//             <label>Nombre de la Empresa</label>
//             <input {...register('companyName')} className="input" />
//             {errors.companyName && <p className="text-red-500">{errors.companyName.message}</p>}
//           </div>
//         )}

//         <button type="submit" className="btn-primary" disabled={loading}>
//           {loading ? 'Registrando...' : 'Registrarse'}
//         </button>
//       </form>
//     </div>
//   );
// }

// app/auth/register/page.tsx
import { redirect } from 'next/navigation';
import getUserFromCookie from '@/app/lib/auth';
import RegisterClientForm from './RegisterClientForm';
export default async function RegisterPage() {
  const user = await getUserFromCookie();

  if (user) {
    // ya logueado, lo redirigimos al dashboard
    redirect('/dashboard');
  }

  return <RegisterClientForm companies={[]} />;
}
