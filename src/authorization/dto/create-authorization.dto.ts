import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class CreateAuthorizationDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
