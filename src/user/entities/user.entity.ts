import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  phone: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, enum: ['SELLER', 'CUSTOMER'] })
  role: string;

  @Prop({ type: String })
  region: string;

  @Prop({ type: String })
  shopName?: string;

  @Prop({ type: String })
  location?: string;

  @Prop({ type: String })
  image?: string;
}
export const UserSchema = SchemaFactory.createForClass(User);