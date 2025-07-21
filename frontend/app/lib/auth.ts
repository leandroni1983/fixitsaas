import { cookies } from 'next/headers';
import { jwtDecode } from 'jwt-decode';
import { redirect } from 'next/navigation';
import { FixitTokenPayload } from '../types';

export default async function getUserFromCookie():Promise<FixitTokenPayload> {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value;
  if (!token) redirect('/auth/login');

  try {
    return jwtDecode(token);
  } catch (error) {
    console.error('Token inválido', error);
    redirect('/auth/login');
  }
}