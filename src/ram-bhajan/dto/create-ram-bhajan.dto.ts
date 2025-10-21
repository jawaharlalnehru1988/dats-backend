import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, ValidateNested, IsArray } from 'class-validator';
import { Type } from 'class-transformer';

export class AudioDataDto {
  @ApiProperty({ description: 'Audio source URL' })
  @IsString()
  @IsNotEmpty()
  audioSrc: string;

  @ApiProperty({ description: 'Image source URL' })
  @IsString()
  @IsNotEmpty()
  imageSrc: string;

  @ApiProperty({ description: 'Author name' })
  @IsString()
  @IsNotEmpty()
  auther: string;

  @ApiProperty({ description: 'Audio title' })
  @IsString()
  @IsNotEmpty()
  title: string;
}

export class CardItemDto {
  @ApiProperty({ description: 'Image URL' })
  @IsString()
  @IsNotEmpty()
  img: string;

  @ApiProperty({ description: 'Title' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ description: 'Category' })
  @IsString()
  @IsNotEmpty()
  category: string;

  @ApiProperty({ description: 'Description' })
  @IsString()
  @IsNotEmpty()
  desc: string;

  @ApiProperty({ description: 'Tamil description' })
  @IsString()
  @IsNotEmpty()
  tamilDescription: string;

  @ApiProperty({ type: AudioDataDto, description: 'Audio data' })
  @ValidateNested()
  @Type(() => AudioDataDto)
  audioData: AudioDataDto;

  @ApiProperty({ description: 'Rating' })
  @IsString()
  @IsNotEmpty()
  rating: string;

  @ApiProperty({ description: 'Action' })
  @IsString()
  @IsNotEmpty()
  action: string;
}

export class CreateRamBhajanDto {
  @ApiProperty({ description: 'Category name' })
  @IsString()
  @IsNotEmpty()
  categoryName: string;

  @ApiProperty({ type: [CardItemDto], description: 'Array of card items' })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CardItemDto)
  cardItems: CardItemDto[];
}
