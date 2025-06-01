import {
  IsNumber,
  IsEnum,
  IsDate,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreatePaymentDto {
  @IsNotEmpty()
  @IsNumber()
  order_id: number;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsString()
  payment_method: string;

  @IsNotEmpty()
  @IsString()
  payment_status: string;

  @IsNotEmpty()
  @IsDate()
  paid_at: Date;

  @IsNotEmpty()
  @IsDate()
  created_at: Date;

  @IsNotEmpty()
  @IsDate()
  updated_at: Date;
}
