import { ApiProperty } from '@nestjs/swagger';

export class AudioDataDto {
  @ApiProperty()
  audioSrc: string;

  @ApiProperty()
  imageSrc: string;

  @ApiProperty()
  auther: string;

  @ApiProperty()
  title: string;
}

export class CardItemDto {
  @ApiProperty()
  img: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  category: string;

  @ApiProperty()
  desc: string;

  @ApiProperty({ type: AudioDataDto })
  audioData: AudioDataDto;

  @ApiProperty()
  rating: string;

  @ApiProperty()
  action: string;
}

export class CreateBgSlokaChapterDto {
  @ApiProperty()
  categoryName: string;

  @ApiProperty({ type: [CardItemDto] })
  cardItems: CardItemDto[];
}

import { PartialType } from '@nestjs/swagger';

export class UpdateBgSlokaChapterDto extends PartialType(
  CreateBgSlokaChapterDto,
) {}
