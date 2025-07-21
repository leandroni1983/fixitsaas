import { Order } from "../types"

export default function OrderCard({ order }: { order: Order }) {
    return (
        <div
          key={order.id}
          className="rounded-2xl shadow-md p-4 border border-gray-200"
        >
          <h2 className="text-lg font-semibold">Cliente: {order.clientName}</h2>
          <p>Dispositivo: {order.device}</p>
          <p>Estado: {order.status}</p>
        </div>
    )
    }

   