import { ApiProperty } from '@nestjs/swagger';

class QaSectionDto {
  @ApiProperty()
  question: string;

  @ApiProperty()
  answer: string;
}

export class CreateBgSlokaChapterDto {
  @ApiProperty()
  slokaAudio: string;

  @ApiProperty()
  languageType: string;

  @ApiProperty({ maxLength: 8000 })
  slokaText: string;

  @ApiProperty()
  chapterName: string;

  @ApiProperty()
  chapterNo: string;

  @ApiProperty({ type: [QaSectionDto] })
  qaSection: QaSectionDto[];
}

import { PartialType } from '@nestjs/swagger';

export class UpdateBgSlokaChapterDto extends PartialType(CreateBgSlokaChapterDto) {}
