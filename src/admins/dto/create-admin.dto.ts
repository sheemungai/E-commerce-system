/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class CreateAdminDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsEmail()
  email: string;
}
