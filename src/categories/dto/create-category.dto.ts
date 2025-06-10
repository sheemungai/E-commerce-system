import { IsString, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({ description: 'Name of the category', example: 'Electronics' })
  @IsString()
  category_name: string;

  @ApiProperty({
    description: 'Creation date of the category',
    example: '2023-01-01T00:00:00Z',
  })
  @IsDateString()
  created_at: Date;
}
