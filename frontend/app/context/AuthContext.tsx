'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import api from '../lib/api';
import { set } from 'zod';

type User = {
  name: string;
  role: 'ADMIN' | 'TECHNICIAN';
};

type AuthContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
  isloading?: boolean;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
  logout: () => {},
  isloading: true,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();


  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token){
      try {
        const decoded: any = JSON.parse(atob(token.split('.')[1]));
        setUser(
          decoded ? {
            name: decoded.name,
            role: decoded.role,
          } : null
        )
         setIsLoading(false);
      }catch (error) {
        console.error('Error decoding token:', error);
        localStorage.removeItem('token');
        router.push('/auth/login');
      }
    }
  },[]);

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    router.push('/auth/login');
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout, isloading: isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);