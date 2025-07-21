'use client'
// app/components/orderCardList.tsx
import { Order } from "../types"
import OrderCard from "./orderCard"

export default function OrderCardList({ orders }: { orders: Order[] }) {
  if (!orders || !Array.isArray(orders)) {
    return <div className="text-red-500">No hay órdenes disponibles.</div>
  }

  return (
    <div className="grid grid-cols-1 gap-4 mt-6">
      {orders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </div>
  )
}
