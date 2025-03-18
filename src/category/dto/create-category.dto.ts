import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, MaxLength } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ example: 'Electronics', description: 'Category name' })
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  name: string;
}
