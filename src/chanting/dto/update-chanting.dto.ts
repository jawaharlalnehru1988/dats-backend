import { PartialType } from '@nestjs/swagger';
import { CreateChantingDto } from './create-chanting.dto';

export class UpdateChantingDto extends PartialType(CreateChantingDto) {}
