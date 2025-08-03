import { IsString, IsOptional } from 'class-validator';

export class AddVideoCommentDto {
  @IsString()
  @IsOptional()
  comment?: string;

  @IsString()
  @IsOptional()
  userName?: string;
}
