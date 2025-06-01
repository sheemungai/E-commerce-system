import {
  IsString,
  IsEmail,
  IsDateString,
  IsNotEmpty,
  IsEnum,
} from 'class-validator';
import { UserRole } from '../enums/user-role.enum';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsEnum(UserRole, { message: 'Role must be ADMIN or USER' })
  role: UserRole;

  @IsDateString()
  created_at: Date;

  @IsDateString()
  updated_at: Date;
}
