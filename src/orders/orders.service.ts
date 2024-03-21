import { Injectable } from '@nestjs/common';
import { OrdersRepository } from './orders.repository';

@Injectable()
export class OrdersService {
  constructor(private readonly ordersRepository: OrdersRepository) {}

  addOrder(userId: string, products: any, price: number) {
    return this.ordersRepository.addOrder(userId, products, price);
  }

  getOrder(id: string) {
    return this.ordersRepository.getOrder(id);
  }
}
