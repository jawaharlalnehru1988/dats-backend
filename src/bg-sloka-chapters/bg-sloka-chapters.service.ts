import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateBgSlokaChapterDto } from './dto/create-bg-sloka-chapter.dto';
import { UpdateBgSlokaChapterDto } from './dto/update-bg-sloka-chapter.dto';
import { BgSlokaChapter } from './entities/bg-sloka-chapter.schema';

@Injectable()
export class BgSlokaChaptersService {
  constructor(
    @InjectModel(BgSlokaChapter.name) private readonly chapterModel: Model<BgSlokaChapter>,
  ) {}

  async create(dto: CreateBgSlokaChapterDto): Promise<BgSlokaChapter> {
    return new this.chapterModel(dto).save();
  }

  async findAll(): Promise<any[]> {
    const allItems = await this.chapterModel.find().exec();
    
    // Group by categoryName and merge cardItems
    const groupedData: any[] = allItems.reduce((acc: any[], item) => {
      const existingCategory = acc.find(group => group.categoryName === item.categoryName);
      
      if (existingCategory) {
        // Merge cardItems from current item into existing category
        existingCategory.cardItems.push(...item.cardItems);
      } else {
        // Create new category group
        acc.push({
          categoryName: item.categoryName,
          cardItems: [...item.cardItems]
        });
      }
      
      return acc;
    }, []);
    
    return groupedData;
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