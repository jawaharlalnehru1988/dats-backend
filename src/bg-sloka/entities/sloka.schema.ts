import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class BgSloka extends Document {
  @Prop({ required: true })
  slokaNo: string;

  @Prop({ required: true })
  orderNo: number;

  @Prop({ required: true })
  slokaText: string;

  @Prop({ required: false })
  SlokaVoice: string;

  @Prop({ required: false })
  slokaMeaning: string;
}

export const BgSlokaSchema = SchemaFactory.createForClass(BgSloka);
