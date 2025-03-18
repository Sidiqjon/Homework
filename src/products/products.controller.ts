import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UseGuards, Req } from '@nestjs/common';
import { ProductService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/role-based.guard';
import { Roles } from '../common/role.decorator';
import { UserRole } from '../common/role-enum';
import { Request } from 'express';

@Controller('products')
@UseGuards(JwtAuthGuard, RolesGuard) 
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @Roles(UserRole.ADMIN)
  async create(@Body() createProductDto: CreateProductDto, @Req() req: Request) {
    const user = req as any; 
    return this.productService.create(createProductDto, user.user?.userId);
  }

  @Get()
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.USER) 
  async findAll(@Query('page') page: number, @Query('take') take: number, @Query('filter') filter: string, @Query('sort') sort: string) {
    return this.productService.findAll(page, take, filter, sort);
  }

  @Get(':id')
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.USER)
  async findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN) 
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN) 
  async remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }
}
