import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Blog extends Document {
  @Prop({ required: true })
  value: string;

  @Prop({ required: true })
  content: string;

  @Prop({ required: true })
  orderNo: number;

  @Prop({ required: true })
  heading: string;

  @Prop({ default: Date.now })
  createdAt: Date;
  
  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const BlogSchema = SchemaFactory.createForClass(Blog);