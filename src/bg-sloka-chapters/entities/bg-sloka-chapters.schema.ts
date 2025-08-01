import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

class QaSection {
  @ApiProperty()
  @Prop({ required: false })
  question: string;

  @ApiProperty()
  @Prop({ required: false })
  answer: string;
}

@Schema()
export class BgSlokaChapter extends Document {
  @ApiProperty()
  @Prop({ required: true })
  slokaAudio: string;

  @ApiProperty()
  @Prop({ required: true })
  languageType: string;

  @ApiProperty({ maxLength: 15000 })
  @Prop({ required: false, type: String, maxlength: 15000 })
  slokaText: string;

  @ApiProperty()
  @Prop({ required: true })
  chapterName: string;

  @ApiProperty()
  @Prop({ required: true })
  chapterNo: string;

  @ApiProperty({ type: [QaSection] })
  @Prop({ type: [{ question: String, answer: String }], default: [] })
  qaSection: QaSection[];
}

export const BgSlokaChapterSchema =
  SchemaFactory.createForClass(BgSlokaChapter);
