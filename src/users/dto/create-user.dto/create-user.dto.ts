import { IsString, IsEmail, IsDate } from 'class-validator';
export class CreateUserDto {
  @IsString()
  user_id: string;

  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  role: string;

  @IsDate()
  created_at: Date;

  @IsDate()
  updated_at: Date;
}
