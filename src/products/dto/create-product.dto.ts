import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsMongoId, IsOptional, IsBoolean } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ example: 'Laptop', description: 'Product name' })
  @IsString()
  name: string;

  @ApiProperty({ example: '65fb2d55c4a7d6b9e3c5a0b1', description: 'Category ID' })
  @IsMongoId()
  category: string;

  @ApiProperty({ example: 1200, description: 'Product price' })
  @IsNumber()
  price: number;

  @ApiProperty({ example: 'A high-end gaming laptop', description: 'Product description' })
  @IsString()
  description: string;

  @ApiProperty({ example: true, description: 'Is product new or not', required: false })
  @IsOptional()
  @IsBoolean()
  new?: boolean;
}
