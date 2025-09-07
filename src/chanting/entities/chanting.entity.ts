import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type ChantingDocument = Chanting & Document;

@Schema({
  timestamps: true, // Automatically adds createdAt and updatedAt fields
})
export class Chanting {
  @ApiProperty({ description: 'Title of the chant' })
  @Prop({ required: true, trim: true })
  chantTitle: string;

  @ApiProperty({ description: 'Audio URL for the chant' })
  @Prop({ required: true })
  chantAudioUrl: string;

  @ApiProperty({ description: 'Content/lyrics of the chant' })
  @Prop({ required: true })
  chantContent: string;

  @ApiProperty({ description: 'Language of the chant' })
  @Prop({ required: true, trim: true })
  language: string;

  @ApiProperty({ description: 'Image URL for the chant' })
  @Prop({ required: false })
  chantImageUrl: string;

  @ApiProperty({ description: 'Author of the chant' })
  @Prop({ required: true, trim: true })
  author: string;

  @ApiProperty({ description: 'View count for the chant' })
  @Prop({ default: 0 })
  views: number;

  @ApiProperty({ description: 'Duration of the chant in seconds' })
  @Prop({ required: false })
  duration?: number;

  @ApiProperty({ description: 'Tags for the chant' })
  @Prop({ type: [String], default: [] })
  tags: string[];

  @ApiProperty({ description: 'Whether the chant is published' })
  @Prop({ default: true })
  isPublished: boolean;
}

export const ChantingSchema = SchemaFactory.createForClass(Chanting);
