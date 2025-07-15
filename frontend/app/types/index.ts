export type User = {
  id: number;
  email: string;
  name: string;
  role: 'ADMIN' | 'TECHNICIAN';
  companyId: number;
};

export type OrderStatus = {
  RECEIVED: 'RECEIVED',
  IN_PROCESS: 'IN_PROCESS',
  READY: 'READY',
  DELIVERED: 'DELIVERED',
}

export type Order = {
  id: number;
  description: string;
  status: OrderStatus[keyof OrderStatus];
  clientName: string;
  contact: string;
  notifyBy: string;
  internalNote?: string;
  device: string;
  stateAtReception: string;
  companyId: number;
  userId: number;
  createdAt: string;
  updatedAt: string;
};

export type Company = {
  id: number;
  name: string;
};


export type RegisterUserData = {
  email: string;
  password: string;
  name: string;
  role: 'ADMIN' | 'TECHNICIAN';
  companyId: number;
};

export type LoginUserData = {
  email: string;
  password: string;
};

export type LoginResponse = {
  accessToken: string;
  user: User;
};
export type RegisterResponse = {
  user: User;
};

export type RegisterAdminData = {
  email: string;
  password: string;
  name: string;
  companyName: string;
};