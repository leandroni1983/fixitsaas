// 'use client';

// import { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { useRouter } from 'next/navigation';
// import { loginUser } from '../../lib/api';
// import { useAuth } from '../../context/AuthContext';
// import { loginSchema, LoginForm } from '@/app/types/schemas';

// export default function LoginPage() {
//   const router = useRouter();
//   const { login } = useAuth(); // Cambiado a usar el método login
//   const [error, setError] = useState<string | null>(null);
//   const [isLoading, setIsLoading] = useState(false); // Corregido el nombre de la variable

//   const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({
//     resolver: zodResolver(loginSchema),
//   });

//   const onSubmit = async (data: LoginForm) => {
//     setIsLoading(true);
//     setError(null);
//     try {
//       const response = await loginUser(data);
//       const { accessToken, user } = response.data;
      
//       // Usamos el método login del contexto que actualiza todo el estado
//       login(accessToken, {
//         id: user.userId,
//         role: user.role,
//         companyId: user.companyId,
//         name: user.name
//       });
      
//       router.push('/dashboard');
//     } catch (error: any) {
//       console.error('Error al iniciar sesión:', error);
//       const errorMessage = error.response?.data?.message || 'Error al iniciar sesión';
//       setError(errorMessage);
//     } finally {
//       setIsLoading(false);
//     }
//   };

   
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
//         <h1 className="text-2xl font-bold mb-6 text-center text-blue-800">Iniciar Sesión</h1>
//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" aria-label="Formulario de inicio de sesión">
//           {error && (
//             <p className="text-red-500 text-sm text-center" role="alert">
//               {error}
//             </p>
//           )}
//           <div>
//             <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//               Email
//             </label>
//             <input
//               id="email"
//               {...register('email')}
//               className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
//               type="email"
//               aria-invalid={errors.email ? 'true' : 'false'}
//               aria-describedby={errors.email ? 'email-error' : undefined}
//             />
//             {errors.email && (
//               <p id="email-error" className="text-red-500 text-sm mt-1" role="alert">
//                 {errors.email.message}
//               </p>
//             )}
//           </div>
//           <div>
//             <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//               Contraseña
//             </label>
//             <input
//               id="password"
//               {...register('password')}
//               className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
//               type="password"
//               aria-invalid={errors.password ? 'true' : 'false'}
//               aria-describedby={errors.password ? 'password-error' : undefined}
//             />
//             {errors.password && (
//               <p id="password-error" className="text-red-500 text-sm mt-1" role="alert">
//                 {errors.password.message}
//               </p>
//             )}
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-blue-800 text-white p-2 rounded-md hover:bg-blue-600 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed"
//             disabled={isLoading}
//             aria-label="Iniciar sesión"
//           >
//             {isLoading ? 'Cargando...' : 'Iniciar Sesión'}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }


'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { loginUser } from '../../lib/api';
import { useAuth } from '../../context/AuthContext';

const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const { setUser } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    try {
      const response = await loginUser(data);
      const { accessToken } = response.data; // Ajustado para accessToken
      localStorage.setItem('token', accessToken); // Guarda accessToken
      setUser(null); // No hay datos de usuario en la respuesta
      router.push('/dashboard');
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      alert('Error al iniciar sesión');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-primary">Iniciar Sesión</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-black">Email</label>
            <input
              {...register('email')}
              className="w-full p-2 border rounded-md"
              type="email"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-black">Contraseña</label>
            <input
              {...register('password')}
              className="w-full p-2 border rounded-md"
              type="password"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>
          <button
            type="submit"
            className="w-full text-white p-2 rounded-md bg-blue-800 hover:bg-blue-600 transition-colors"
          >
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
}