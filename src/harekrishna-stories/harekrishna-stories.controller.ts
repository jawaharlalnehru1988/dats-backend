import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HarekrishnaStoriesService } from './harekrishna-stories.service';
import { CreateHarekrishnaStoryDto } from './dto/create-harekrishna-story.dto';
import { UpdateHarekrishnaStoryDto } from './dto/update-harekrishna-story.dto';

@Controller('harekrishna-stories')
export class HarekrishnaStoriesController {
  constructor(private readonly harekrishnaStoriesService: HarekrishnaStoriesService) {}

  @Post()
  create(@Body() createHarekrishnaStoryDto: CreateHarekrishnaStoryDto) {
    return this.harekrishnaStoriesService.create(createHarekrishnaStoryDto);
  }

  @Get()
  findAll() {
    return this.harekrishnaStoriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.harekrishnaStoriesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHarekrishnaStoryDto: UpdateHarekrishnaStoryDto) {
    return this.harekrishnaStoriesService.update(+id, updateHarekrishnaStoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.harekrishnaStoriesService.remove(+id);
  }
}
