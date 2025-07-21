
import { jwtDecode } from 'jwt-decode';
import Navbar from './components/navbar/navbar';
import './globals.css';
import { FixitTokenPayload } from './types';
import { cookies } from 'next/headers';

export default async function RootLayout({ children }: { children: React.ReactNode }) {

    const cookieStore = await cookies()
    const token = cookieStore.get('token')?.value;
    let user: FixitTokenPayload | null = null;
  
    if (token) {
      try {
        user = jwtDecode(token);
      } catch (error) {
        console.error('Token inválido');
      }
    }
  

  return (
    <html lang="es">
      <body>
      <Navbar user={user} />
          {children}
      </body>
    </html>
  );
}

