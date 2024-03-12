import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.repository';

@Injectable()
export class ProductsService {
  constructor(private ProductsRepository: ProductsRepository) {}

  getProducts(page: number, limit: number) {
    return this.ProductsRepository.getProducts(page, limit);
  }

  getProduct(id: number) {
    return this.ProductsRepository.getProduct(id);
  }

  addProduct(product: any) {
    return this.ProductsRepository.addProduct(product);
  }

  updateProduct(id: number, product: any) {
    return this.ProductsRepository.updateProduct(id, product);
  }
}
