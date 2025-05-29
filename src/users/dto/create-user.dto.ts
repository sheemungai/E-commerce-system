import {
  IsString,
  IsEmail,
  IsDateString,
  IsNotEmpty,
  IsEnum,
} from 'class-validator';
export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsEnum(['Admin', 'User'], { message: 'Role must be Admin or User' })
  role: 'Admin' | 'User';

  @IsDateString()
  created_at: Date;

  @IsDateString()
  updated_at: Date;
}
