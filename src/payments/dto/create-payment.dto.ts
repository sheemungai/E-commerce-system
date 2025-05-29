import { IsNumber, IsEnum } from 'class-validator';

export class CreatePaymentDto {
  @IsNumber()
  amount: number;

  @IsEnum(['Credit Card', 'Paypal', 'Razorpay'])
  payment_method: string;
}
