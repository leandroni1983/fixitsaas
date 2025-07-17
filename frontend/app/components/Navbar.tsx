'use client';

import Link from 'next/link';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout, isloading } = useAuth();
  return (
    <nav className="bg-primary text-white p-4">
     
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">FixitSaaS</Link>
        <div className="space-x-4">
          {user ? (
            <>
              <Link href="/dashboard" className="px-4 py-2 text-white font-medium rounded-md 
              transition-colors duration-300 hover:bg-gray-900active:bg-slate-950  hover:ring-gray-800  hover:ring-2 
              focus:outline-none focus:ring-2 focus:ring-opacity-50 ">Dashboard</Link>
              <Link href="/orders" className="px-4 py-2  text-white font-medium rounded-md 
              transition-colors duration-300 hover:bg-gray-900active:bg-slate-950   hover:ring-gray-800  hover:ring-2 
              focus:outline-none focus:ring-2 focus:ring-opacity-50 ">Órdenes</Link>
              <button onClick={logout} className="px-4 py-2 text-white font-medium rounded-md 
              transition-colors duration-300 hover:bg-gray-900active:bg-slate-950
              focus:outline-none focus:ring-2 focus:ring-opacity-50 hover:ring-gray-800  hover:ring-2 
              ">Cerrar Sesión</button>
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