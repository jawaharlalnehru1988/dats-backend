import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateHarekrishnaKirtanDto } from './dto/create-harekrishna-kirtan.dto';
import { UpdateHarekrishnaKirtanDto } from './dto/update-harekrishna-kirtan.dto';
import { HarekrishnaKirtan } from './entities/harekrishna-kirtan.schema';

@Injectable()
export class HarekrishnaKirtanService {
  constructor(
    @InjectModel(HarekrishnaKirtan.name)
    private readonly harekrishnaKirtanModel: Model<HarekrishnaKirtan>,
  ) {}

  async create(createDto: CreateHarekrishnaKirtanDto): Promise<HarekrishnaKirtan> {
    const newKirtan = new this.harekrishnaKirtanModel(createDto);
    return newKirtan.save();
  }

  async findAll(): Promise<HarekrishnaKirtan[]> {
    return this.harekrishnaKirtanModel.find().exec();
  }

  async findOne(id: string): Promise<HarekrishnaKirtan> {
    const kirtan = await this.harekrishnaKirtanModel.findById(id).exec();
    if (!kirtan) {
      throw new NotFoundException(`Harekrishna Kirtan with ID ${id} not found`);
    }
    return kirtan;
  }

  async update(id: string, updateDto: UpdateHarekrishnaKirtanDto): Promise<HarekrishnaKirtan> {
    const updatedKirtan = await this.harekrishnaKirtanModel
      .findByIdAndUpdate(id, updateDto, { new: true })
      .exec();
    
    if (!updatedKirtan) {
      throw new NotFoundException(`Harekrishna Kirtan with ID ${id} not found`);
    }
    
    return updatedKirtan;
  }

  async remove(id: string): Promise<HarekrishnaKirtan> {
    const deletedKirtan = await this.harekrishnaKirtanModel
      .findByIdAndDelete(id)
      .exec();
    
    if (!deletedKirtan) {
      throw new NotFoundException(`Harekrishna Kirtan with ID ${id} not found`);
    }
    
    return deletedKirtan;
  }

  // Additional methods for specific functionality
  async findByRating(minRating: number): Promise<HarekrishnaKirtan[]> {
    return this.harekrishnaKirtanModel
      .find({ ratings: { $gte: minRating } })
      .exec();
  }

  async findBySinger(singerName: string): Promise<HarekrishnaKirtan[]> {
    return this.harekrishnaKirtanModel
      .find({ singerName: { $regex: new RegExp(singerName, 'i') } })
      .exec();
  }
}
