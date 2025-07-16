// 'use client';

// import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
// import { useRouter } from 'next/navigation';
// import api from '../lib/api';


// type User = {
//   id: number;
//   email: string;
//   name: string;
//   role: 'ADMIN' | 'TECHNICIAN';
//   companyId: number;
// };

// type AuthContextType = {
//   user: User | null;
//   loading: boolean; // Estado de carga
//   setUser: (user: User | null) => void;
//   logout: () => void;
//   refreshUser: () => void;
//   login: (token: string, userInfo: Partial<User>) => void;
// };

// const AuthContext = createContext<AuthContextType>({
//   user: null,
//   loading: true,
//   setUser: () => {},
//   logout: () => {},
//   refreshUser: () => {},
//   login: () => {},
// });

// export function AuthProvider({ children }: { children: ReactNode }) {
//   const [user, setUser] = useState<User | null>(null);
//   const [loading, setLoading] = useState(true); // Estado de carga
//   const router = useRouter();

//   const fetchUserProfile = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         setLoading(false);
//         return;
//       }
//       const response = await api.get('/users/profile');
//       setUser(response.data);
//     } catch (error) {
//       console.error('Error fetching user profile:', error);
//       localStorage.removeItem('token');
//       setUser(null);
//       router.push('/auth/login');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchUserProfile();
//     const handleStorageChange = (e: StorageEvent) => {
//       if(e.key === 'token') {
//         if(e.newValue) {
//           // Si hay un nuevo token, actualizamos el usuario
//         fetchUserProfile();
//       }else{
//         setUser(null);
//       }
//     };
//   }
//     window.addEventListener('storage', handleStorageChange);
    
//     return () => {
//       window.removeEventListener('storage', handleStorageChange);
//     };
//   }, []); 

//   const logout = () => {
//     localStorage.removeItem('token');
//     setUser(null);
//     router.push('/auth/login');
//   };

//   const refreshUser = () => {
//     fetchUserProfile();
//   };

//    const login = (token: string, userInfo: Partial<User>) => {
//     localStorage.setItem('token', token);
//     setUser(userInfo as User); 
//   };

//   return (
//     <AuthContext.Provider value={{ 
//       user, 
//       setUser, 
//       logout, 
//       loading, 
//       refreshUser ,
//       login,
//       }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export const useAuth = () => useContext(AuthContext);



'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import api from '../lib/api';

type User = {
  id: number;
  email: string;
  name: string;
  role: 'ADMIN' | 'TECHNICIAN';
  companyId: number;
};

type AuthContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Opcional: Validar el token con el backend
      api.get('/users/profile')
        .then((response) => {
          setUser(response.data);
        })
        .catch(() => {
          localStorage.removeItem('token');
          router.push('/auth/login');
        });
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    router.push('/auth/login');
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);