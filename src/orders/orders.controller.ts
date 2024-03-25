import {
  Body,
  Controller,
  Get,
  ParseUUIDPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from '../dtos/orders.dto';
import { AuthGuard } from '../auth/guards/auth/auth.guard';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @ApiBearerAuth()
  @Post()
  @UseGuards(AuthGuard)
  addOrder(@Body() order: CreateOrderDto) {
    const { userId, products } = order;
    return this.ordersService.addOrder(userId, products);
  }

  @ApiBearerAuth()
  @Get(':id')
  @UseGuards(AuthGuard)
  getOrder(@Query('id', ParseUUIDPipe) id: string) {
    return this.ordersService.getOrder(id);
  }
}
