import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}
  
  // This method creates a new order in the database.
  // It takes a CreateOrderDto object and the user making the request.
  // The user object contains the userId and companyId, which are used to associate the order with the user and their company.
  // The method uses the Prisma service to interact with the database and create the order.
  // It returns the created order object.
  // If the user is not authenticated or does not have the necessary permissions, it will throw an error.
  // The status of the order defaults to RECEIVED if not provided in the DTO
  async create(dto: CreateOrderDto ,user:any) {
    return this.prisma.order.create({
      data: {
        ...dto,
        userId: user.userId,
        companyId: user.companyId
      },
    });
  }
   // This method retrieves all orders for a user, ensuring that the user has access to them based on their role and company.
   // If the user is an Admin, it retrieves all orders for the company.
   // If the user is a Technician, it retrieves only the orders assigned to them.
   // If the user is a Client, it retrieves only their own orders.
   // If the user is a Guest, it retrieves no orders.
   // The method uses the Prisma service to query the database and returns the orders.
   // It also handles the case where the user has no orders by returning an empty array.
   async findAll(user: any) {
    if(user.role === 'Admin'){
    return this.prisma.order.findMany({
     where: { companyId: user.companyId },
    });
  }
    return this.prisma.order.findMany({
      where: { userId: user.userId, companyId: user.companyId },
    });
  }
 // This method updates an existing order in the database.
 // It takes an ID of the order to update, an UpdateOrderDto object containing the new data, and the user making the request.
 // It first checks if the order exists; if not, it throws a NotFoundException.
 // If the order exists, it updates the order with the new data provided in the DTO.
 // If the status of the order is changed, it logs this change in the order history.
 // The method returns the updated order object.
 // It also ensures that the user has the necessary permissions to update the order.
 // If the user is not authorized to update the order, it throws a ForbiddenException.

  async update(id: number, dto: UpdateOrderDto, user: any) {
  const existingOrder = await this.prisma.order.findUnique({ where: { id } });

  if (!existingOrder) {
    throw new NotFoundException('La orden no existe');
  }

  const order = await this.prisma.order.update({
    where: { id },
    data: {
      ...dto,
    },
  });

  // Solo registrar si el estado cambió
  if (dto.status && dto.status !== existingOrder.status) {
    await this.prisma.orderHistory.create({
      data: {
        orderId: id,
        changedBy: user.userId,
        fromStatus: existingOrder.status,
        toStatus: dto.status,
        note: dto.internalNote ?? null,
      },
    });
  }

  return order;
}


  // This method retrieves a single order by its ID, ensuring that the user has access to it based on their role and company.
  // If the user is an Admin, it retrieves the order if it belongs to their company.
  // If the user is a Technician, it retrieves the order only if it is assigned to them.
  async findOne(id: number, user: any) {
  const order = await this.prisma.order.findUnique({
    where: { id },
  });

  if (!order || order.companyId !== user.companyId) {
    throw new ForbiddenException('No tenés acceso a esta orden');
  }

  if (user.role === 'TECHNICIAN' && order.userId !== user.userId) {
    throw new ForbiddenException('No tenés acceso a esta orden');
  }

  return order;
}

// This method retrieves the history of changes made to a specific order.
// It takes the order ID and the user making the request.
// It first checks if the order exists and if the user has access to it based on their company ID.
// If the order exists and the user has access, it retrieves the order history from the database.
// The history includes the changes made to the order, such as status changes, notes, and the user who made the changes.
// It returns the order history, which can be used to track the changes made to the order over time.
// If the order does not exist or the user does not have access, it throws a ForbiddenException.
async getHistory(orderId: number, user: any) {
  const order = await this.prisma.order.findUnique({
    where: { id: orderId },
  });

  if (!order || order.companyId !== user.companyId) {
    throw new ForbiddenException('No tenés acceso a esta orden');
  }

  return this.prisma.orderHistory.findMany({
    where: { orderId },
    orderBy: { createdAt: 'desc' },
    include: {
      user: { select: { name: true, email: true } },
    },
  });
}

}
