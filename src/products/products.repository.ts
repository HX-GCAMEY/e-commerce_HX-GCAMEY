import { Injectable } from '@nestjs/common';

type Product = {
  name: string;
  description: string;
  price: number;
  stock: boolean;
  imgUrl: string;
};

@Injectable()
export class ProductsRepository {
  private products: Product[] = [
    {
      name: 'Laptop',
      description: 'High-performance laptop with Intel Core i7 processor',
      price: 999.99,
      stock: true,
      imgUrl: 'https://example.com/laptop.jpg',
    },
    {
      name: 'Smartphone',
      description: 'Latest smartphone with dual-camera setup',
      price: 699.99,
      stock: true,
      imgUrl: 'https://example.com/smartphone.jpg',
    },
    {
      name: 'Headphones',
      description: 'Wireless headphones with noise cancellation feature',
      price: 199.99,
      stock: false,
      imgUrl: 'https://example.com/headphones.jpg',
    },
    {
      name: 'Smartwatch',
      description: 'Fitness tracker smartwatch with heart rate monitor',
      price: 149.99,
      stock: true,
      imgUrl: 'https://example.com/smartwatch.jpg',
    },
    {
      name: 'Wireless Mouse',
      description: 'Ergonomic wireless mouse with adjustable DPI',
      price: 29.99,
      stock: true,
      imgUrl: 'https://example.com/mouse.jpg',
    },
  ];

  getProducts() {
    return this.products;
  }
}
