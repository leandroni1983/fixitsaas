'use client';

import { useEffect, useState } from 'react';
import { getOrders } from '../lib/api';
import ProtectedRoute from '../components/ProtectedRoute';
import { useRouter } from 'next/navigation';

type Order = {
  id: number;
  description: string;
  status: 'RECEIVED' | 'IN_PROCESS' | 'READY' | 'DELIVERED';
  clientName: string;
  device: string;
};

export default function DashboardPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getOrders();
        setOrders(response.data);
      } catch (error: any) {
        setError(error.response?.data?.message || 'Error al cargar órdenes');
      }
    };
    fetchOrders();
  }, []);

  return (
    <ProtectedRoute>
      <div className="container mx-auto p-4">

        <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={() => router.push('/orders/create')}
          >
            Crear nueva orden
        </button>

        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {orders.length === 0 && !error && <p className="text-gray-600">No hay órdenes disponibles</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      </div>
    </ProtectedRoute>
  );
}

function OrderCard({ order }: { order: Order }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold">{order.clientName}</h2>
      <p className="text-sm text-gray-600">{order.device}</p>
      <p className="text-sm">{order.description}</p>
      <span
        className={`inline-block mt-2 px-2 py-1 text-xs font-semibold rounded ${
          order.status === 'RECEIVED'
            ? 'bg-blue-100 text-blue-800'
            : order.status === 'IN_PROCESS'
            ? 'bg-yellow-100 text-yellow-800'
            : order.status === 'READY'
            ? 'bg-green-100 text-green-800'
            : 'bg-gray-100 text-gray-800'
        }`}
      >
        {order.status}
      </span>
    </div>
  );
}