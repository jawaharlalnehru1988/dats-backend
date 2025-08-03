import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HarekrishnaPhilosophyService } from './harekrishna-philosophy.service';
import { CreateHarekrishnaPhilosophyDto } from './dto/create-harekrishna-philosophy.dto';
import { UpdateHarekrishnaPhilosophyDto } from './dto/update-harekrishna-philosophy.dto';

@Controller('harekrishna-philosophy')
export class HarekrishnaPhilosophyController {
  constructor(private readonly harekrishnaPhilosophyService: HarekrishnaPhilosophyService) {}

  @Post()
  create(@Body() createHarekrishnaPhilosophyDto: CreateHarekrishnaPhilosophyDto) {
    return this.harekrishnaPhilosophyService.create(createHarekrishnaPhilosophyDto);
  }

  @Get()
  findAll() {
    return this.harekrishnaPhilosophyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.harekrishnaPhilosophyService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHarekrishnaPhilosophyDto: UpdateHarekrishnaPhilosophyDto) {
    return this.harekrishnaPhilosophyService.update(+id, updateHarekrishnaPhilosophyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.harekrishnaPhilosophyService.remove(+id);
  }
}
