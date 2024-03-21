import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ProductsRepository } from './products.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from '../entities/products.entity';
import { Categories } from 'src/entities/categories.entity';
import { CategoriesRepository } from 'src/categories/categories.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Products]),
    TypeOrmModule.forFeature([Categories]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService, ProductsRepository, CategoriesRepository],
})
export class ProductsModule {}
