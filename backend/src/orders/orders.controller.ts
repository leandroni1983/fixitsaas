import { Body, Controller, Get, Param, Post, Req, Patch, ParseIntPipe } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/jwt/jwt.guard';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ApiTags, ApiOperation, ApiBody, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';


@UseGuards(JwtGuard)
@ApiBearerAuth() // Agrega el candadito para enviar el JWT
@ApiTags('orders') // para agrupar las rutas de pedidos en Swagger
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}
  
  @Post()
  @ApiOperation({ summary: 'Crear un nuevo pedido' })
  @ApiBody({ type: CreateOrderDto })
  @ApiResponse({ status: 201, description: 'Pedido creado exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
    create(@Body() dto: CreateOrderDto, @Req() req) {
      return this.ordersService.create(dto, req.user);
    }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los pedidos' })
  @ApiResponse({
    status: 200,
    description: 'Lista de pedidos obtenida exitosamente',
    type: [CreateOrderDto], // Asumiendo que CreateOrderDto es el DTO
  })
  @ApiResponse({ status: 404, description: 'Pedido no encontrado' })
    findAll(@Req() req){
      return this.ordersService.findAll(req.user);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un pedido por ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID de la orden' })
  @ApiResponse({ status: 200, description: 'Pedido encontrado exitosamente' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 403, description: 'Prohibido. No tenés acceso a este pedido' })
  @ApiResponse({ status: 404, description: 'Pedido no encontrado' })
    findOne(@Req() req, @Param('id', ParseIntPipe) id: number) {
      return this.ordersService.findOne(id, req.user);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un pedido por ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID de la orden' })
  @ApiBody({ type: UpdateOrderDto })
  @ApiResponse({ status: 200, description: 'Pedido actualizado exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 403, description: 'Prohibido. No tenés acceso' })
  @ApiResponse({ status: 404, description: 'Pedido no encontrado' })
  update(@Param('id') id: number, @Body() dto: UpdateOrderDto, @Req() req) {
    return this.ordersService.update(+id, dto, req.user);
  }

  @Get(':id/history')
  @ApiOperation({ summary: 'Obtener el historial de un pedido por ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID de la orden' })
  @ApiResponse({ status: 200, description: 'Historial del pedido obtenido exitosamente' })
  @ApiResponse({ status: 403, description: 'Acceso prohibido' })
  @ApiResponse({ status: 404, description: 'Pedido no encontrado' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  getOrderHistory(@Param('id') id: number, @Req() req) {
    return this.ordersService.getHistory(+id, req.user);
}
}