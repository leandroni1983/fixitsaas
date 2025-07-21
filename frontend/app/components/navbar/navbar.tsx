import Link from 'next/link';
import { FixitTokenPayload } from '@/app/types';

export default async function Navbar({user}: {user: FixitTokenPayload | null}) {

 
  return (
  <nav className="bg-primary text-white p-4">
  <div className="container mx-auto flex justify-between items-center">
    <Link href="/" className="text-xl font-bold">FixitSaaS</Link>
    <div className="flex space-x-4 items-center"> {/* Aquí flex para alinear todo */}
      {user ? (
        <>
          <Link
            href="/dashboard"
            className="px-4 py-2 text-white font-medium rounded-md
                       transition-colors duration-300 hover:bg-gray-900 active:bg-slate-950
                       hover:ring-gray-800 hover:ring-2 focus:outline-none focus:ring-2 focus:ring-opacity-50"
          >
            Dashboard
          </Link>
          <Link
            href="/orders"
            className="px-4 py-2 text-white font-medium rounded-md
                       transition-colors duration-300 hover:bg-gray-900 active:bg-slate-950
                       hover:ring-gray-800 hover:ring-2 focus:outline-none focus:ring-2 focus:ring-opacity-50"
          >
            Órdenes
          </Link>
          <form method="POST" action="/auth/logout" className="m-0"> {/* Sin márgenes */}
            <button
              type="submit"
              className="px-4 py-2 text-white font-medium rounded-md
                         transition-colors duration-300 hover:bg-gray-900 active:bg-slate-950
                         focus:outline-none focus:ring-2 focus:ring-opacity-50 hover:ring-gray-800 hover:ring-2"
            >
              Cerrar Sesión
            </button>
          </form>
        </>
      ) : (
        <>
          <Link href="/auth/login" className="hover:underline">Iniciar Sesión</Link>
          <Link href="/auth/register" className="hover:underline">Registrarse</Link>
        </>
      )}
    </div>
  </div>
</nav>
  );
}