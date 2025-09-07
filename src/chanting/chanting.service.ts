import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateChantingDto } from './dto/create-chanting.dto';
import { UpdateChantingDto } from './dto/update-chanting.dto';
import { Chanting, ChantingDocument } from './entities/chanting.entity';

@Injectable()
export class ChantingService {
  constructor(
    @InjectModel(Chanting.name)
    private readonly chantingModel: Model<ChantingDocument>,
  ) {}

  async create(createChantingDto: CreateChantingDto): Promise<Chanting> {
    const createdChanting = new this.chantingModel(createChantingDto);
    return createdChanting.save();
  }

  async findAll(): Promise<Chanting[]> {
    return this.chantingModel
      .find({ isPublished: true })
      .sort({ createdAt: -1 })
      .exec();
  }

  async findOne(id: string): Promise<Chanting> {
    const chanting = await this.chantingModel.findById(id).exec();
    if (!chanting) {
      throw new NotFoundException(`Chanting with ID ${id} not found`);
    }
    
    // Increment view count
    await this.chantingModel.findByIdAndUpdate(id, { $inc: { views: 1 } });
    
    return chanting;
  }

  async findByLanguage(language: string): Promise<Chanting[]> {
    return this.chantingModel
      .find({ language: { $regex: new RegExp(language, 'i') }, isPublished: true })
      .sort({ createdAt: -1 })
      .exec();
  }

  async findByAuthor(author: string): Promise<Chanting[]> {
    return this.chantingModel
      .find({ author: { $regex: new RegExp(author, 'i') }, isPublished: true })
      .sort({ createdAt: -1 })
      .exec();
  }

  async searchChantings(query: string): Promise<Chanting[]> {
    const searchRegex = new RegExp(query, 'i');
    return this.chantingModel
      .find({
        $and: [
          { isPublished: true },
          {
            $or: [
              { chantTitle: { $regex: searchRegex } },
              { chantContent: { $regex: searchRegex } },
              { author: { $regex: searchRegex } },
              { language: { $regex: searchRegex } },
              { tags: { $in: [searchRegex] } },
            ],
          },
        ],
      })
      .sort({ createdAt: -1 })
      .exec();
  }

  async update(id: string, updateChantingDto: UpdateChantingDto): Promise<Chanting> {
    const updatedChanting = await this.chantingModel
      .findByIdAndUpdate(id, updateChantingDto, { new: true })
      .exec();
    
    if (!updatedChanting) {
      throw new NotFoundException(`Chanting with ID ${id} not found`);
    }
    
    return updatedChanting;
  }

  async remove(id: string): Promise<void> {
    const result = await this.chantingModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Chanting with ID ${id} not found`);
    }
  }

  async getPopularChantings(limit: number = 10): Promise<Chanting[]> {
    return this.chantingModel
      .find({ isPublished: true })
      .sort({ views: -1 })
      .limit(limit)
      .exec();
  }

  async getRecentChantings(limit: number = 10): Promise<Chanting[]> {
    return this.chantingModel
      .find({ isPublished: true })
      .sort({ createdAt: -1 })
      .limit(limit)
      .exec();
  }
}
