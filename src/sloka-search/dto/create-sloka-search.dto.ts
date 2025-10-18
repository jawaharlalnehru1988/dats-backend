import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, IsOptional, IsBoolean, IsUrl, Min } from 'class-validator';

export class CreateSlokaSearchDto {
  @ApiProperty({ description: 'Chapter number', example: 1 })
  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  chapterNo: number;

  @ApiProperty({ description: 'Sloka number', example: 1 })
  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  slokaNo: number;

  @ApiProperty({ description: 'Image URL for the sloka', example: 'https://example.com/sloka-image.jpg' })
  @IsString()
  @IsNotEmpty()
  @IsUrl()
  slokaImageUrl: string;

  @ApiProperty({ description: 'First line of the sloka text', example: 'धृतराष्ट्र उवाच' })
  @IsString()
  @IsNotEmpty()
  slokaTextFirstLine: string;

  @ApiProperty({ description: 'Second line of the sloka text', example: 'धर्मक्षेत्रे कुरुक्षेत्रे समवेता युयुत्सवः' })
  @IsString()
  @IsNotEmpty()
  slokaTextSecondLine: string;

  @ApiProperty({ description: 'Combined sloka text', example: 'धृतराष्ट्र उवाच धर्मक्षेत्रे कुरुक्षेत्रे समवेता युयुत्सवः' })
  @IsString()
  @IsNotEmpty()
  slokaTextCombined: string;

  @ApiProperty({ description: 'Translation of the sloka', example: 'Dhritarashtra said: O Sanjaya...' })
  @IsString()
  @IsNotEmpty()
  slokaTranslation: string;

  @ApiProperty({ description: 'Purport/explanation of the sloka', example: 'In this opening verse...' })
  @IsString()
  @IsNotEmpty()
  slokaPurport: string;

  @ApiProperty({ description: 'Voice URL for first line', example: 'https://example.com/voice-first-line.mp3' })
  @IsString()
  @IsNotEmpty()
  @IsUrl()
  slokaVoiceFirstLineUrl: string;

  @ApiProperty({ description: 'Voice URL for second line', example: 'https://example.com/voice-second-line.mp3' })
  @IsString()
  @IsNotEmpty()
  @IsUrl()
  slokaVoiceSecondLineUrl: string;

  @ApiProperty({ description: 'Voice URL for combined sloka', example: 'https://example.com/voice-combined.mp3' })
  @IsString()
  @IsNotEmpty()
  @IsUrl()
  slokaVoiceCombinedUrl: string;

  @ApiProperty({ description: 'Voice URL for translation', example: 'https://example.com/voice-translation.mp3' })
  @IsString()
  @IsNotEmpty()
  @IsUrl()
  slokaVoiceTranslationVoiceUrl: string;

  @ApiProperty({ description: 'Voice URL for purport', example: 'https://example.com/voice-purport.mp3' })
  @IsString()
  @IsNotEmpty()
  @IsUrl()
  slokaVoicePurportUrl: string;

  @ApiProperty({ description: 'Whether the sloka is published', required: false, default: true })
  @IsOptional()
  @IsBoolean()
  isPublished?: boolean;
}
