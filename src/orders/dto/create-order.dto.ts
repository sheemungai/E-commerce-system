import { IsString, IsNumber, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty({ description: 'Quantity of the product', example: 2 })
  @IsNumber()
  user_id: number;

  @ApiProperty({ description: 'Total amount of the order', example: 100 })
  @IsNumber()
  total_amount: number;

  @ApiProperty({ description: 'Status of the order', example: 'Pending' })
  @IsString()
  @IsEnum(['PENDING', 'SHIPPED', 'DELIVERED', 'CANCELLED'])
  status: 'PENDING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
}
