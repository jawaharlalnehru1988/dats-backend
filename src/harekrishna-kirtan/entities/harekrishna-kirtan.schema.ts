import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ _id: false })
export class Quote {
  @Prop({ required: true })
  quoteContent: string;

  @Prop({ required: true })
  quoteFrom: string;
}

const QuoteSchema = SchemaFactory.createForClass(Quote);

@Schema({ timestamps: true })
export class HarekrishnaKirtan extends Document {
  @Prop({ required: true })
  audioUrl: string;

  @Prop({ required: true })
  singerName: string;

  @Prop({ type: [QuoteSchema], default: [] })
  quoteAboutHarinam: Quote[];

  @Prop({ required: true, min: 0, max: 5 })
  ratings: number;
}

export const HarekrishnaKirtanSchema = SchemaFactory.createForClass(HarekrishnaKirtan);
