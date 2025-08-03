import { Injectable } from '@nestjs/common';
import { CreateHarekrishnaStoryDto } from './dto/create-harekrishna-story.dto';
import { UpdateHarekrishnaStoryDto } from './dto/update-harekrishna-story.dto';

@Injectable()
export class HarekrishnaStoriesService {
  create(createHarekrishnaStoryDto: CreateHarekrishnaStoryDto) {
    return 'This action adds a new harekrishnaStory';
  }

  findAll() {
    return `This action returns all harekrishnaStories`;
  }

  findOne(id: number) {
    return `This action returns a #${id} harekrishnaStory`;
  }

  update(id: number, updateHarekrishnaStoryDto: UpdateHarekrishnaStoryDto) {
    return `This action updates a #${id} harekrishnaStory`;
  }

  remove(id: number) {
    return `This action removes a #${id} harekrishnaStory`;
  }
}
