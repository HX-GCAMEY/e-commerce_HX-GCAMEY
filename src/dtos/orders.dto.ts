import { ArrayMinSize, IsArray, IsNotEmpty, IsUUID } from 'class-validator';
import { Products } from '../entities/products.entity';

export class CreateOrderDto {
  /**
   * Debe ser un UUID, no puede estar vacío
   * @example '123e4567-e89b-12d3-a456-426614174000'
   */

  @IsNotEmpty()
  @IsUUID()
  userId: string;

  /**
   * Debe ser un arreglo con al menos un elemento
   * @example [{ id: '123e4567-e89b-12d3-a456-426614174000' }]
   */

  @IsArray()
  @ArrayMinSize(1)
  products: Partial<Products[]>;
}
