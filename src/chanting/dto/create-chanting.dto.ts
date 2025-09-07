import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsNumber, IsArray, IsBoolean, IsUrl } from 'class-validator';

export class CreateChantingDto {
  @ApiProperty({ description: 'Title of the chant', example: 'Hare Krishna Maha Mantra' })
  @IsString()
  @IsNotEmpty()
  chantTitle: string;

  @ApiProperty({ description: 'Audio URL for the chant', example: 'https://example.com/chant.mp3' })
  @IsString()
  @IsNotEmpty()
  @IsUrl()
  chantAudioUrl: string;

  @ApiProperty({ description: 'Content/lyrics of the chant', example: 'Hare Krishna Hare Krishna Krishna Krishna Hare Hare...' })
  @IsString()
  @IsNotEmpty()
  chantContent: string;

  @ApiProperty({ description: 'Language of the chant', example: 'Sanskrit' })
  @IsString()
  @IsNotEmpty()
  language: string;

  @ApiProperty({ description: 'Image URL for the chant', required: false, example: 'https://example.com/image.jpg' })
  @IsOptional()
  @IsString()
  @IsUrl()
  chantImageUrl?: string;

  @ApiProperty({ description: 'Author of the chant', example: 'A.C. Bhaktivedanta Swami Prabhupada' })
  @IsString()
  @IsNotEmpty()
  author: string;

  @ApiProperty({ description: 'Duration of the chant in seconds', required: false, example: 180 })
  @IsOptional()
  @IsNumber()
  duration?: number;

  @ApiProperty({ description: 'Tags for the chant', required: false, example: ['mantra', 'devotional', 'meditation'] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @ApiProperty({ description: 'Whether the chant is published', required: false, default: true })
  @IsOptional()
  @IsBoolean()
  isPublished?: boolean;
}
