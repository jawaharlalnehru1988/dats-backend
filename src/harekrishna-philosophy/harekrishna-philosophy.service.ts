import { Injectable } from '@nestjs/common';
import { CreateHarekrishnaPhilosophyDto } from './dto/create-harekrishna-philosophy.dto';
import { UpdateHarekrishnaPhilosophyDto } from './dto/update-harekrishna-philosophy.dto';

@Injectable()
export class HarekrishnaPhilosophyService {
  create(createHarekrishnaPhilosophyDto: CreateHarekrishnaPhilosophyDto) {
    return 'This action adds a new harekrishnaPhilosophy';
  }

  findAll() {
    return `This action returns all harekrishnaPhilosophy`;
  }

  findOne(id: number) {
    return `This action returns a #${id} harekrishnaPhilosophy`;
  }

  update(id: number, updateHarekrishnaPhilosophyDto: UpdateHarekrishnaPhilosophyDto) {
    return `This action updates a #${id} harekrishnaPhilosophy`;
  }

  remove(id: number) {
    return `This action removes a #${id} harekrishnaPhilosophy`;
  }
}
