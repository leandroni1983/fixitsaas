import { Body, Controller, Get, Param, Post, Req, Patch, ParseIntPipe } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/jwt/jwt.guard';
import { UpdateOrderDto } from './dto/update-order.dto';

@UseGuards(JwtGuard)
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}
  
  @Post()
    create(@Body() dto: CreateOrderDto, @Req() req) {
      return this.ordersService.create(dto, req.user);
    }

  @Get()
    findAll(@Req() req){
      return this.ordersService.findAll(req.user);
  }

  @Get(':id')
    findOne(@Req() req, @Param('id', ParseIntPipe) id: number) {
      return this.ordersService.findOne(id, req.user);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() dto: UpdateOrderDto, @Req() req) {
    return this.ordersService.update(+id, dto, req.user);
  }

  @Get(':id/history')
  getOrderHistory(@Param('id') id: number, @Req() req) {
    return this.ordersService.getHistory(+id, req.user);
}
}