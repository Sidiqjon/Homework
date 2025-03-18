import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber, IsMongoId, IsBoolean } from 'class-validator';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @ApiProperty({ example: 'new-image.jpg', description: 'New image filename', required: false })
  @IsOptional()
  @IsString()
  image?: string;
}
