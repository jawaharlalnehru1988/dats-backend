import { PartialType } from '@nestjs/mapped-types';
import { CreateBgSlokaDto } from './create-bg-sloka.dto';

export class UpdateBgSlokaDto extends PartialType(CreateBgSlokaDto) {}
