/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsString, IsEmail, IsDateString, IsNotEmpty } from 'class-validator';
export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  role: string;

  @IsDateString()
  created_at: Date;

  @IsDateString()
  updated_at: Date;
}
