'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { orderSchema, OrderForm } from '../orderSchema';
import { useRouter } from 'next/navigation';
import api from '@/app/lib/api';

export default function CreateOrderPage() {
  const router = useRouter();

const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm<OrderForm>({
  resolver: zodResolver(orderSchema),
});

  const onSubmit = async (data: OrderForm) => {
    try {
      await api.post(`${process.env.NEXT_PUBLIC_API_URL}/orders`, data);
      router.push('/orders'); // Redirigí a donde quieras después de crear
    } catch (error) {
      console.error('Error al crear la orden:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-xl">
        <h1 className="text-2xl font-bold mb-4">Crear Orden de Reparación</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Nombre del Cliente</label>
            <input {...register('clientName')} className="input" />
            {errors.clientName && <p className="text-red-500">{errors.clientName.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium">Contacto</label>
            <input {...register('contact')} className="input" />
            {errors.contact && <p className="text-red-500">{errors.contact.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium">Notificar por</label>
            <input {...register('notifyBy')} className="input" />
            {errors.notifyBy && <p className="text-red-500">{errors.notifyBy.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium">Equipo ingresado</label>
            <input {...register('device')} className="input" />
            {errors.device && <p className="text-red-500">{errors.device.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium">Descripción del problema</label>
            <textarea {...register('description')} className="input" />
            {errors.description && <p className="text-red-500">{errors.description.message}</p>}
          </div>

          <div>
              <label className="block text-sm font-medium">Fecha y hora de recepción</label>
              <input
                {...register('stateAtReception')}
                type="datetime-local"
                className="input"
              />
              {errors.stateAtReception && (
                <p className="text-red-500">{errors.stateAtReception.message}</p>
              )}
          </div>

          <div>
            <label className="block text-sm font-medium">Estado</label>
            <select {...register('status')} className="input">
              <option value="RECEIVED">Recibida</option>
              <option value="IN_PROCESS">En proceso</option>
              <option value="READY">Lista para entregar</option>
              <option value="DELIVERED">Entregada</option>
            </select>
            {errors.status && <p className="text-red-500">{errors.status.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
          >
            Crear Orden
          </button>
        </form>
      </div>
    </div>
  );
}
