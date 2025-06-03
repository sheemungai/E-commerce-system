import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateCachingDto {
  @IsString()
  key: string;

  @IsString()
  value: string;

  @IsInt()
  @IsOptional()
  ttl?: number; // Time to live in seconds, optional
}
