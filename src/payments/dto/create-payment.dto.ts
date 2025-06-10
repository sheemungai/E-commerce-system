import { IsNumber, IsDateString, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePaymentDto {
  @ApiProperty({ description: 'Order ID', example: 1 })
  @IsNotEmpty()
  @IsNumber()
  order_id: number;

  @ApiProperty({ description: 'Payment amount', example: 100 })
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @ApiProperty({ description: 'Payment method', example: 'credit_card' })
  @IsNotEmpty()
  @IsString()
  payment_method: string;

  @ApiProperty({ description: 'Payment status', example: 'completed' })
  @IsNotEmpty()
  @IsString()
  payment_status: string;

  @ApiProperty({ description: 'Payment date', example: '2023-01-01T00:00:00Z' })
  @IsNotEmpty()
  @IsDateString()
  paid_at: Date;

  @ApiProperty({
    description: 'Creation date of the payment',
    example: '2023-01-01T00:00:00Z',
  })
  @IsNotEmpty()
  @IsDateString()
  created_at: Date;

  @ApiProperty({
    description: 'Last update date of the payment',
    example: '2023-01-01T00:00:00Z',
  })
  @IsNotEmpty()
  @IsDateString()
  updated_at: Date;
}
