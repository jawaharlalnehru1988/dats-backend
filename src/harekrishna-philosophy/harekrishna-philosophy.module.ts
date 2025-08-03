import { Module } from '@nestjs/common';
import { HarekrishnaPhilosophyService } from './harekrishna-philosophy.service';
import { HarekrishnaPhilosophyController } from './harekrishna-philosophy.controller';

@Module({
  controllers: [HarekrishnaPhilosophyController],
  providers: [HarekrishnaPhilosophyService],
})
export class HarekrishnaPhilosophyModule {}
