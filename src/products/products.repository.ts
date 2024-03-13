import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from '../entities/products.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsRepository {
  constructor(
    @InjectRepository(Products)
    private productsRepository: Repository<Products>,
  ) {}

  async getProducts(page: number, limit: number): Promise<Products[]> {
    let products = await this.productsRepository.find();

    const start = (page - 1) * limit;
    const end = start + +limit;

    products = products.slice(start, end);

    return products;
  }

  getProduct(id: string) {
    const product = this.productsRepository.findOneBy({ id });

    if (!product) {
      return 'Product not found';
    }

    return product;
  }

  addProduct(product: Products): Promise<Products> {
    return this.productsRepository.save(product);
  }

  async updateProduct(id: string, product: Products) {
    await this.productsRepository.update(id, product);

    const updatedProduct = await this.productsRepository.findOneBy({ id });

    return updatedProduct;
  }
}
