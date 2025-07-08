import { PartialType } from '@nestjs/swagger';
import { CreateRamBhajanDto } from './create-ram-bhajan.dto';

export class UpdateRamBhajanDto extends PartialType(CreateRamBhajanDto) {}
