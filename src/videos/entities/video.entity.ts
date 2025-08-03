import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ _id: false })
export class Comment {
  @Prop({ required: false })
  comment?: string;

  @Prop({ required: false })
  userName?: string;

  @Prop({ default: Date.now })
  createdAt: Date;
}

const CommentSchema = SchemaFactory.createForClass(Comment);

@Schema({ timestamps: true })
export class Video extends Document {
  @Prop({ required: true })
  videoUrl: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: [CommentSchema], default: [] })
  comments: Comment[];
}

export const VideoSchema = SchemaFactory.createForClass(Video);
