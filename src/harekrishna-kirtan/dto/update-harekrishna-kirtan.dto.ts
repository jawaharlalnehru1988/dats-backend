import { PartialType } from '@nestjs/swagger';
import { CreateHarekrishnaKirtanDto } from './create-harekrishna-kirtan.dto';

export class UpdateHarekrishnaKirtanDto extends PartialType(CreateHarekrishnaKirtanDto) {}
