import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateOrderitemDto {
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @IsNotEmpty()
  @IsString()
  orderId: string;

  @IsNotEmpty()
  @IsString()
  productId: string;
}
