import { PartialType } from '@nestjs/swagger';
import { CreateSlokaSearchDto } from './create-sloka-search.dto';

export class UpdateSlokaSearchDto extends PartialType(CreateSlokaSearchDto) {}
