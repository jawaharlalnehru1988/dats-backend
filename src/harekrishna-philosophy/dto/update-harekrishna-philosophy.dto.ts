import { PartialType } from '@nestjs/swagger';
import { CreateHarekrishnaPhilosophyDto } from './create-harekrishna-philosophy.dto';

export class UpdateHarekrishnaPhilosophyDto extends PartialType(CreateHarekrishnaPhilosophyDto) {}
