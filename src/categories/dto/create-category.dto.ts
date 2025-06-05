import { IsString, IsDateString } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  categoryName: string;

  @IsDateString()
  created_at: Date;
}
