import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateBgSlokaDto } from './dto/create-bg-sloka.dto';
import { UpdateBgSlokaDto } from './dto/update-bg-sloka.dto';
import { BgSloka } from './entities/sloka.schema';

@Injectable()
export class BgSlokaService {
  constructor(
    @InjectModel(BgSloka.name) private readonly bgSlokaModel: Model<BgSloka>,
  ) {}

  async create(createBgSlokaDto: CreateBgSlokaDto): Promise<BgSloka> {
    const created = new this.bgSlokaModel(createBgSlokaDto);
    return created.save();
  }

  async findAll(): Promise<BgSloka[]> {
    return this.bgSlokaModel.find().exec();
  }

  async findOne(id: string): Promise<BgSloka | null> {
    return this.bgSlokaModel.findById(id).exec();
  }

  async update(
    id: string,
    updateBgSlokaDto: UpdateBgSlokaDto,
  ): Promise<BgSloka | null> {
    return this.bgSlokaModel
      .findByIdAndUpdate(id, updateBgSlokaDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<BgSloka | null> {
    return this.bgSlokaModel.findByIdAndDelete(id).exec();
  }
}
