import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateOrderDto) {
    return this.prisma.order.create({
      data: {
        ...dto,
        userId: dto.technicianId ?? 1, // más adelante vendrá del JWT
      },
    });
  }

  async findAll() {
    return this.prisma.order.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  }

  async update(id: number, dto: UpdateOrderDto) {
    return this.prisma.order.update({
      where: { id },
      data: {
        ...dto,
      },
    });
  }
}
