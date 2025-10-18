import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateSlokaSearchDto } from './dto/create-sloka-search.dto';
import { UpdateSlokaSearchDto } from './dto/update-sloka-search.dto';
import { SlokaSearch, SlokaSearchDocument } from './entities/sloka-search.entity';

@Injectable()
export class SlokaSearchService {
  constructor(
    @InjectModel(SlokaSearch.name) private slokaSearchModel: Model<SlokaSearchDocument>,
  ) {}

  async create(createSlokaSearchDto: CreateSlokaSearchDto): Promise<SlokaSearch> {
    const createdSloka = new this.slokaSearchModel(createSlokaSearchDto);
    return createdSloka.save();
  }

  async findAll(): Promise<SlokaSearch[]> {
    return this.slokaSearchModel
      .find({ isPublished: true })
      .sort({ chapterNo: 1, slokaNo: 1 })
      .exec();
  }

  async findOne(id: string): Promise<SlokaSearch> {
    const sloka = await this.slokaSearchModel.findById(id).exec();
    if (!sloka) {
      throw new NotFoundException(`Sloka with ID ${id} not found`);
    }
    
    // Increment view count
    await this.slokaSearchModel.findByIdAndUpdate(id, { $inc: { views: 1 } }).exec();
    
    return sloka;
  }

  async findByChapter(chapterNo: number): Promise<SlokaSearch[]> {
    return this.slokaSearchModel
      .find({ chapterNo, isPublished: true })
      .sort({ slokaNo: 1 })
      .exec();
  }

  async findByChapterAndSloka(chapterNo: number, slokaNo: number): Promise<SlokaSearch> {
    const sloka = await this.slokaSearchModel
      .findOne({ chapterNo, slokaNo, isPublished: true })
      .exec();
    
    if (!sloka) {
      throw new NotFoundException(`Sloka ${chapterNo}.${slokaNo} not found`);
    }
    
    // Increment view count
    await this.slokaSearchModel.findByIdAndUpdate(sloka._id, { $inc: { views: 1 } }).exec();
    
    return sloka;
  }

  async search(query: string): Promise<SlokaSearch[]> {
    const searchRegex = new RegExp(query, 'i');
    return this.slokaSearchModel
      .find({
        isPublished: true,
        $or: [
          { slokaTextFirstLine: { $regex: searchRegex } },
          { slokaTextSecondLine: { $regex: searchRegex } },
          { slokaTextCombined: { $regex: searchRegex } },
          { slokaTranslation: { $regex: searchRegex } },
          { slokaPurport: { $regex: searchRegex } },
        ],
      })
      .sort({ chapterNo: 1, slokaNo: 1 })
      .exec();
  }

  async getPopularSlokas(limit: number = 10): Promise<SlokaSearch[]> {
    return this.slokaSearchModel
      .find({ isPublished: true })
      .sort({ views: -1 })
      .limit(limit)
      .exec();
  }

  async getRecentSlokas(limit: number = 10): Promise<SlokaSearch[]> {
    return this.slokaSearchModel
      .find({ isPublished: true })
      .sort({ createdAt: -1 })
      .limit(limit)
      .exec();
  }

  async update(id: string, updateSlokaSearchDto: UpdateSlokaSearchDto): Promise<SlokaSearch> {
    const updatedSloka = await this.slokaSearchModel
      .findByIdAndUpdate(id, updateSlokaSearchDto, { new: true })
      .exec();
    
    if (!updatedSloka) {
      throw new NotFoundException(`Sloka with ID ${id} not found`);
    }
    
    return updatedSloka;
  }

  async remove(id: string): Promise<SlokaSearch> {
    const deletedSloka = await this.slokaSearchModel.findByIdAndDelete(id).exec();
    if (!deletedSloka) {
      throw new NotFoundException(`Sloka with ID ${id} not found`);
    }
    return deletedSloka;
  }
}
