import { IsString, IsNumber, IsEnum, IsDateString } from 'class-validator';
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
  @IsEnum(['Pending', 'Shipped', 'Delivered', 'Cancelled'])
  status: 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled';

  @ApiProperty({
    description: 'Creation date of the order',
    example: '2023-01-01T00:00:00Z',
  })
  @IsDateString()
  created_at: Date;

  @ApiProperty({
    description: 'Last update date of the order',
    example: '2023-01-01T00:00:00Z',
  })
  @IsDateString()
  updated_at: Date;
}
