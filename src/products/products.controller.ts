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
import { AuthGuard } from '../auth/guards/auth/auth.guard';
import { Roles } from '../decorators/roles.decorator';
import { Role } from '../roles.enum';
import { RolesGuard } from '../auth/guards/roles/roles.guard';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}
  @Get()
  getProducts(@Query('page') page: number, @Query('limit') limit: number) {
    if (page && limit) {
      return this.productsService.getProducts(page, limit);
    }
    return this.productsService.getProducts(1, 5);
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
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  updateProduct(@Query('id', ParseUUIDPipe) id: string, @Body() product: any) {
    return this.productsService.updateProduct(id, product);
  }
}
