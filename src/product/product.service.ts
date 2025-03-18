import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class ProductService {
  constructor(@InjectModel(Product.name) private productModel: Model<Product>) {}

  async create(createProductDto: CreateProductDto, userId: string) {
    const newProduct = new this.productModel({
      ...createProductDto,
      user: userId,
    });
    return await newProduct.save();
  }

  async findAll(page = 1, take = 10, filter?: string, sort?: string) {
    const query = this.productModel.find().populate('category').populate('user');

    if (filter) {
      query.where({ name: new RegExp(filter, 'i') });
    }
    if (sort) {
      query.sort({ name: sort === 'asc' ? 1 : -1 });
    }

    const skip = (page - 1) * take;
    return await query.skip(skip).limit(take).exec();
  }

  async findOne(id: string) {
    const product = await this.productModel.findById(id).populate('category').populate('user');
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const existingProduct = await this.productModel.findById(id);
    if (!existingProduct) throw new NotFoundException('Product not found');

    if (updateProductDto.image) {
      this.deleteImageFile(updateProductDto.image);
    }

    const updatedProduct = await this.productModel.findByIdAndUpdate(id, updateProductDto, { new: true });
    return updatedProduct;
  }

  async remove(id: string) {
    const product = await this.productModel.findByIdAndDelete(id);
    if (!product) throw new NotFoundException('Product not found');

    if (product.image) {
      this.deleteImageFile(product.image);
    }
    return { message: 'Product deleted successfully' };
  }

  private deleteImageFile(filename: string) {
    const filePath = path.join(__dirname, '../../uploads', filename);
    fs.unlink(filePath, () => {}); 
  }
}
