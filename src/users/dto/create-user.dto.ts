import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsEnum,
  IsDateString,
} from 'class-validator';
import { UserRole } from '../enums/user-role.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: 'Username of the user', example: 'john_doe' })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    description: 'Email of the user',
    example: 'john_doe@example.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Password of the user',
    example: 'securepassword123',
  })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({ description: 'Role of the user', example: 'ADMIN' })
  @IsNotEmpty()
  @IsEnum(UserRole, { message: 'Role must be ADMIN or USER' })
  role: UserRole;

  @ApiProperty({
    description: 'Creation date of the user',
    example: '2023-01-01T00:00:00Z',
  })
  @IsDateString()
  created_at: Date;

  @ApiProperty({
    description: 'Last update date of the user',
    example: '2023-01-01T00:00:00Z',
  })
  @IsDateString()
  Updated_at: Date;
}
