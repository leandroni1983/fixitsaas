'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import api from '@/app/lib/api';


interface Order {
  id: number;
  clientName: string;
  contact: string;
  notifyBy: string;
  device: string;
  description: string;
  stateAtReception: string;
  status: string;
}

export default function OrderDetailsPage() {
  const { orderid } = useParams();
  const [order, setOrder] = useState<Order | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await api.get(`/orders/${orderid}`)

        if (!res) throw new Error('No se pudo obtener la orden.');

        const data = await res.data;
        setOrder(data);
        
      } catch (err) {
        console.error(err);
        setError('Error al obtener la orden.');
      }
    };

    fetchOrder();
  }, [orderid]);

  if (error) return <p className="text-red-500">{error}</p>;
  if (!order) return <p className="text-white">Cargando...</p>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold text-white mb-4">Detalles de la Orden</h1>
      <div className="text-white space-y-2">
        <p><strong>Cliente:</strong> {order.clientName}</p>
        <p><strong>Contacto:</strong> {order.contact}</p>
        <p><strong>Equipo:</strong> {order.device}</p>
        <p><strong>Problema:</strong> {order.description}</p>
        <p><strong>Estado al recibir:</strong> {order.stateAtReception}</p>
        <p><strong>Estado actual:</strong> {order.status}</p>
      </div>
    </div>
  );
}
