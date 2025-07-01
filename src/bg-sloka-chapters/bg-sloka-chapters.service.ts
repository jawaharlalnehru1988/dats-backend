import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BgSlokaChapter } from './entities/bg-sloka-chapters.schema';
import { CreateBgSlokaChapterDto } from './dto/create-bg-sloka-chapter.dto';
import { UpdateBgSlokaChapterDto } from './dto/update-bg-sloka-chapter.dto';

@Injectable()
export class BgSlokaChaptersService {
  constructor(
    @InjectModel(BgSlokaChapter.name) private readonly chapterModel: Model<BgSlokaChapter>,
  ) {}

  async create(dto: CreateBgSlokaChapterDto): Promise<BgSlokaChapter> {
    return new this.chapterModel(dto).save();
  }

  async findAll(): Promise<BgSlokaChapter[]> {
    return this.chapterModel.find().exec();
  }

  async findOne(id: string): Promise<BgSlokaChapter | null> {
    return this.chapterModel.findById(id).exec();
  }

  async update(id: string, dto: UpdateBgSlokaChapterDto): Promise<BgSlokaChapter | null> {
    return this.chapterModel.findByIdAndUpdate(id, dto, { new: true }).exec();
  }

  async remove(id: string): Promise<BgSlokaChapter | null> {
    return this.chapterModel.findByIdAndDelete(id).exec();
  }
}