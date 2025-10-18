import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type SlokaSearchDocument = SlokaSearch & Document;

@Schema({
  timestamps: true, // Automatically adds createdAt and updatedAt fields
})
export class SlokaSearch {
  @ApiProperty({ description: 'Chapter number', example: 1 })
  @Prop({ required: true })
  chapterNo: number;

  @ApiProperty({ description: 'Sloka number', example: 1 })
  @Prop({ required: true })
  slokaNo: number;

  @ApiProperty({ description: 'Image URL for the sloka', example: 'https://example.com/sloka-image.jpg' })
  @Prop({ required: true })
  slokaImageUrl: string;

  @ApiProperty({ description: 'First line of the sloka text', example: 'धृतराष्ट्र उवाच' })
  @Prop({ required: true })
  slokaTextFirstLine: string;

  @ApiProperty({ description: 'Second line of the sloka text', example: 'धर्मक्षेत्रे कुरुक्षेत्रे समवेता युयुत्सवः' })
  @Prop({ required: true })
  slokaTextSecondLine: string;

  @ApiProperty({ description: 'Combined sloka text', example: 'धृतराष्ट्र उवाच धर्मक्षेत्रे कुरुक्षेत्रे समवेता युयुत्सवः' })
  @Prop({ required: true })
  slokaTextCombined: string;

  @ApiProperty({ description: 'Translation of the sloka', example: 'Dhritarashtra said: O Sanjaya...' })
  @Prop({ required: true })
  slokaTranslation: string;

  @ApiProperty({ description: 'Purport/explanation of the sloka', example: 'In this opening verse...' })
  @Prop({ required: true })
  slokaPurport: string;

  @ApiProperty({ description: 'Voice URL for first line', example: 'https://example.com/voice-first-line.mp3' })
  @Prop({ required: true })
  slokaVoiceFirstLineUrl: string;

  @ApiProperty({ description: 'Voice URL for second line', example: 'https://example.com/voice-second-line.mp3' })
  @Prop({ required: true })
  slokaVoiceSecondLineUrl: string;

  @ApiProperty({ description: 'Voice URL for combined sloka', example: 'https://example.com/voice-combined.mp3' })
  @Prop({ required: true })
  slokaVoiceCombinedUrl: string;

  @ApiProperty({ description: 'Voice URL for translation', example: 'https://example.com/voice-translation.mp3' })
  @Prop({ required: true })
  slokaVoiceTranslationVoiceUrl: string;

  @ApiProperty({ description: 'Voice URL for purport', example: 'https://example.com/voice-purport.mp3' })
  @Prop({ required: true })
  slokaVoicePurportUrl: string;

  @ApiProperty({ description: 'View count for the sloka' })
  @Prop({ default: 0 })
  views: number;

  @ApiProperty({ description: 'Whether the sloka is published' })
  @Prop({ default: true })
  isPublished: boolean;
}

export const SlokaSearchSchema = SchemaFactory.createForClass(SlokaSearch);
