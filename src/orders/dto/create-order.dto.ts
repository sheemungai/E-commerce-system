import { IsString, IsNumber, IsEnum, IsDateString } from 'class-validator';
import { ManyToOne } from 'typeorm';
export class CreateOrderDto {
  @IsString()
  quantity: string;

  @IsNumber()
  price: number;

  @IsEnum(['Pending', 'Shipped', 'Delivered', 'Cancelled'])
  status: 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled';

  @IsDateString()
  created_at: Date;

  @IsDateString()
  updated_at: Date;
}
