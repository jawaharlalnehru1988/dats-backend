import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class AudioData {
  @Prop({ required: true })
  audioSrc: string;

  @Prop({ required: true })
  imageSrc: string;

  @Prop({ required: true })
  auther: string;

  @Prop({ required: true })
  title: string;
}

export const AudioDataSchema = SchemaFactory.createForClass(AudioData);

@Schema()
export class CardItem {
  @Prop({ required: true })
  img: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  category: string;

  @Prop({ required: true })
  desc: string;

  @Prop({ type: AudioDataSchema, required: true })
  audioData: AudioData;

  @Prop({ required: true })
  rating: string;

  @Prop({ required: true })
  action: string;
}

export const CardItemSchema = SchemaFactory.createForClass(CardItem);

@Schema({ timestamps: true })
export class RamBhajan extends Document {
  @Prop({ required: true })
  categoryName: string;

  @Prop({ type: [CardItemSchema], required: true })
  cardItems: CardItem[];
}

export const RamBhajanSchema = SchemaFactory.createForClass(RamBhajan);
