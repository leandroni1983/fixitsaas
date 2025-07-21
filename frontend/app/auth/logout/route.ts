import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.redirect(new URL('/auth/login', process.env.NEXT_PUBLIC_FRONTEND_URL || 'http://localhost:5000'));
  response.cookies.set('token', '', { path: '/', maxAge: 0, httpOnly: true });
  return response;
}