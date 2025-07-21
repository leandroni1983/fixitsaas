import { cookies } from "next/headers";
import { User } from "../types";


export async function getOrdersForUser() {
  
  const cookiesToString = (await cookies()).toString()
  
  const res = await fetch('http://localhost:3001/orders', {
    credentials: 'include',
    headers: {
      Cookie: cookiesToString, 
    },
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('No se pudieron cargar las órdenes');
  }

  return res.json();
}



export const registerUser = async (data: User) => {
  const response = await fetch('http://localhost:3001/auth/register',{
    method: 'POST',
    credentials: 'include',
    headers:{
    Cookie: cookiesToString,
    },
    cache: 'no-store',
    body: JSON.stringify(data),
  });
   if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Error al registrar usuario');
  }

  return response.json();
};