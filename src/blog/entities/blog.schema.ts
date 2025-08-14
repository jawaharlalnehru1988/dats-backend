import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ _id: false })
export class Comment {
  @Prop({ required: false })
  userName?: string;

  @Prop({ required: false })
  comment?: string;
}

const CommentSchema = SchemaFactory.createForClass(Comment);

@Schema({ timestamps: true })
export class Blog extends Document {
  @Prop({ required: true })
  blogTitle: string;

  @Prop({ required: true })
  blogImgUrl: string;

  @Prop({ required: true })
  content: string;

  @Prop({ required: true })
  category: string;

  @Prop({ required: true })
  author: string;

  @Prop({ type: [CommentSchema], default: [] })
  comments: Comment[];
}

export const BlogSchema = SchemaFactory.createForClass(Blog);
