import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RamBhajan } from './entities/ram-bhajan.schema';
import { CreateRamBhajanDto } from './dto/create-ram-bhajan.dto';
import { UpdateRamBhajanDto } from './dto/update-ram-bhajan.dto';

@Injectable()
export class RamBhajanService {
  constructor(
    @InjectModel(RamBhajan.name) private readonly ramBhajanModel: Model<RamBhajan>,
  ) {}

  async create(createDto: CreateRamBhajanDto): Promise<RamBhajan> {
    return new this.ramBhajanModel(createDto).save();
  }

  async findAll(): Promise<RamBhajan[]> {
    return this.ramBhajanModel.find().exec();
  }

  async findOne(id: string): Promise<RamBhajan | null> {
    const item = await this.ramBhajanModel.findById(id).exec();
    if (!item) throw new NotFoundException('Not found');
    return item;
  }

  async update(id: string, updateDto: UpdateRamBhajanDto): Promise<RamBhajan | null> {
    const item = await this.ramBhajanModel.findByIdAndUpdate(id, updateDto, { new: true }).exec();
    if (!item) throw new NotFoundException('Not found');
    return item;
  }

  async remove(id: string): Promise<RamBhajan | null> {
    const item = await this.ramBhajanModel.findByIdAndDelete(id).exec();
    if (!item) throw new NotFoundException('Not found');
    return item;
  }
}
