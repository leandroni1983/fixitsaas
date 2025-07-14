'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

type Order = {
  id: number;
  description: string;
  status: 'RECEIVED' | 'IN_PROCESS' | 'READY' | 'DELIVERED';
  clientName: string;
  device: string;
};

export default function DashboardPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://your-backend-url/api/orders');
        setOrders(response.data);
      } catch (error) {
        console.error('Error al cargar órdenes:', error);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {orders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </div>
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