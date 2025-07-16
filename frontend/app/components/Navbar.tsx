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
              <Link href="/dashboard" className="hover:underline">Dashboard</Link>
              <Link href="/orders" className="hover:underline">Órdenes</Link>
              <button onClick={logout} className="hover:underline">Cerrar Sesión</button>
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