import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateFestivalDto } from './dto/create-festival.dto';
import { UpdateFestivalDto } from './dto/update-festival.dto';
import { Festival } from './entities/festival.schema';
import { Model } from 'mongoose';

@Injectable()
export class FestivalsService {
  constructor(
    @InjectModel(Festival.name)
    private readonly festivalModel: Model<Festival>,
  ) {}

  create(createFestivalDto: CreateFestivalDto) {
    const newFestival = new this.festivalModel(createFestivalDto);
    return newFestival.save();
  }

  findAll() {
    return this.festivalModel.find();
  }

  findOne(id: number) {
    return this.festivalModel.findById(id);
  }

  update(id: number, updateFestivalDto: UpdateFestivalDto) {
    return this.festivalModel.findByIdAndUpdate(id, updateFestivalDto, {
      new: true,
    });
  }

  remove(id: number) {
    return this.festivalModel.findByIdAndDelete(id);
  }
}
