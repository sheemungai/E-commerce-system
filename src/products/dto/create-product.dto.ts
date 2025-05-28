/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsString, IsNumber, IsDateString, IsNotEmpty } from 'class-validator';
export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  price: number;

  @IsString()
  image: string;

  @IsString()
  category_id: string;

  @IsNumber()
  stock_quantity: number;
  @IsDateString()
  created_at: string;
  @IsDateString()
  updated_at: string;
}
