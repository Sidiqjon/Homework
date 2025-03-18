import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private readonly categoryModel: Model<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const existingCategory = await this.categoryModel.findOne({ name: createCategoryDto.name });
    if (existingCategory) {
      throw new ConflictException('Category already exists');
    }
    const category = new this.categoryModel(createCategoryDto);
    return category.save();
  }

  async findAll(): Promise<Category[]> {
    return this.categoryModel.find().sort({ createdAt: -1 }).exec();
  }

  async findOne(id: string): Promise<Category> {
    const category = await this.categoryModel.findById(id);
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return category;
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<Category> {
    const category = await this.categoryModel.findByIdAndUpdate(id, updateCategoryDto, { new: true });
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return category;
  }

  async remove(id: string): Promise<{ message: string }> {
    const category = await this.categoryModel.findByIdAndDelete(id);
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return { message: 'Category deleted successfully' };
  }
}
