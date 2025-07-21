import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;
  const isAuth = Boolean(token);
  const { pathname } = req.nextUrl;

  const publicPaths = [
   
    '/about',
    '/auth/login',
    '/auth/register'
  ];

  console.log('🧠 Middleware activo');
  console.log('➡️ Pathname:', pathname);
  console.log('🔐 Token presente:', isAuth);

  if (publicPaths.some((path) => pathname === path || pathname.startsWith(path + '/'))) {
    console.log('✅ Ruta pública, permitiendo acceso');
    return NextResponse.next();
  }

  if (!isAuth) {
    console.log('⛔ No autenticado, redirigiendo al login');
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }

  if (isAuth && pathname.startsWith('/auth')) {
    console.log('🔁 Ya autenticado, redirigiendo al dashboard');
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  console.log('✅ Ruta protegida permitida');
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api).*)'],
};
