export type User = {
  id: number;
  email: string;
  name: string;
  role: 'ADMIN' | 'TECHNICIAN';
  companyId: number;
};

export type Order = {
  id: number;
  description: string;
  status: 'RECEIVED' | 'IN_PROCESS' | 'READY' | 'DELIVERED';
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