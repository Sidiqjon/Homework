import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from '../../user/entities/user.entity';
import { Category } from '../../categories/entities/category.entity';
import { Types } from 'mongoose';

@Schema({ timestamps: true })
export class Product extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, type: Types.ObjectId, ref: 'Category' })
  category: Category;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  description: string;

  @Prop({ default: true })
  new: boolean;

  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  user: User;

  @Prop({ required: false })
  image: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
