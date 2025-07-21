import OrderCardList from '../components/orderCardList';
import { getOrdersForUser } from '../lib/api';
import getUserFromCookie from '../lib/auth';
import { Order } from '../types';
export default async function DashboardPage() {

  const user = await getUserFromCookie()

  const orders:Order[] = await getOrdersForUser()

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Bienvenido, {user.name}</h1>
      <p>Tu rol es: {user.role}</p>
      <OrderCardList orders = {orders}/>
    </div>
  );
}

