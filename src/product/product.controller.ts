import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UseGuards, Req } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Request } from 'express';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
    @Post()
    @UseGuards(JwtAuthGuard)
    async create(@Body() createProductDto: CreateProductDto, @Req() req: Request) {
      const user = req as any; 
      return this.productService.create(createProductDto, user.user?.userId);
    }
  
  @Get()
  async findAll(@Query('page') page: number, @Query('take') take: number, @Query('filter') filter: string, @Query('sort') sort: string) {
    return this.productService.findAll(page, take, filter, sort);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }
}
