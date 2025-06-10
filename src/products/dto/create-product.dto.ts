import { IsString, IsNumber, IsDateString, IsNotEmpty } from 'class-validator';
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

  @ApiProperty({
    description: 'Creation date of the product',
    example: '2023-01-01T00:00:00Z',
  })
  @IsDateString()
  created_at: string;

  @ApiProperty({
    description: 'Last update date of the product',
    example: '2023-01-01T00:00:00Z',
  })
  @IsDateString()
  updated_at: string;
}
