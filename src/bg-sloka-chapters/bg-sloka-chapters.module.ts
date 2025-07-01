import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BgSlokaChaptersService } from './bg-sloka-chapters.service';
import { BgSlokaChaptersController } from './bg-sloka-chapters.controller';
import { BgSlokaChapter, BgSlokaChapterSchema } from './entities/bg-sloka-chapters.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: BgSlokaChapter.name, schema: BgSlokaChapterSchema }])
  ],
  controllers: [BgSlokaChaptersController],
  providers: [BgSlokaChaptersService],
})
export class BgSlokaChaptersModule {}