import { IsString, IsNumber, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ description: 'Name of the product', example: 'Laptop' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Description of the product',
    example: 'A high-end laptop',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ description: 'Price of the product', example: 1500 })
  @IsNumber()
  price: number;

  @ApiProperty({
    description: 'Image URL of the product',
    example: 'https://example.com/laptop.jpg',
  })
  @IsString()
  img: string;

  @ApiProperty({ description: 'Category ID of the product', example: 1 })
  @IsNumber()
  category_id: number;

  @ApiProperty({ description: 'Stock quantity of the product', example: 100 })
  @IsNumber()
  stock_quantity: number;
}
