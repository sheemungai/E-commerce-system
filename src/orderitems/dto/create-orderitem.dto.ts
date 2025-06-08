import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderitemDto {
  @ApiProperty({
    description: 'Order ID associated with the order item',
    example: '1',
  })
  @IsNotEmpty()
  @IsNumber()
  order_id: number;

  @ApiProperty({
    description: 'Product ID associated with the order item',
    example: '5',
  })
  @IsNotEmpty()
  @IsNumber()
  product_id: number;

  @ApiProperty({ description: 'Quantity of the order item', example: 2 })
  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @ApiProperty({ description: 'Price of the order item', example: 29.99 })
  @IsNotEmpty()
  @IsNumber()
  price: number;
}
