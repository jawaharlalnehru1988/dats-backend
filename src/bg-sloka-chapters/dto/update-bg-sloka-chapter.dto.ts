import { PartialType } from '@nestjs/swagger';
import { CreateBgSlokaChapterDto } from './create-bg-sloka-chapter.dto';

export class UpdateBgSlokaChapterDto extends PartialType(CreateBgSlokaChapterDto) {}
