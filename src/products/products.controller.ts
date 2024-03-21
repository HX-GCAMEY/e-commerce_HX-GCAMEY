import {
  Controller,
  Get,
  Post,
  Put,
  Query,
  Body,
  Param,
  UseGuards,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { AuthGuard } from 'src/auth/guards/auth/auth.guard';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}
  @Get()
  getProducts(@Query('page') page: number, @Query('limit') limit: number) {
    if (page && limit) {
      return this.productsService.getProducts(page, limit);
    }
    return this.productsService.getProducts(1, 2);
  }

  @Get('seeder')
  addProducts() {
    return this.productsService.addProducts();
  }

  @Get(':id')
  getProduct(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.getProduct(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  updateProduct(@Query('id', ParseUUIDPipe) id: string, @Body() product: any) {
    return this.productsService.updateProduct(id, product);
  }
}
