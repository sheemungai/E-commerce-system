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

  @IsNumber()
  category_id: number;

  @IsNumber()
  stock_quantity: number;
  @IsDateString()
  created_at: string;
  @IsDateString()
  updated_at: string;
}
