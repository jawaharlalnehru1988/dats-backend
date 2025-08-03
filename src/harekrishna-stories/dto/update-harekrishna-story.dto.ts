import { PartialType } from '@nestjs/swagger';
import { CreateHarekrishnaStoryDto } from './create-harekrishna-story.dto';

export class UpdateHarekrishnaStoryDto extends PartialType(CreateHarekrishnaStoryDto) {}
