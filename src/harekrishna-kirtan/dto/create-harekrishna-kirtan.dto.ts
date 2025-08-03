import { IsString, IsArray, IsNumber, Min, Max, ValidateNested, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class QuoteDto {
  @IsString()
  @IsNotEmpty()
  quoteContent: string;

  @IsString()
  @IsNotEmpty()
  quoteFrom: string;
}

export class CreateHarekrishnaKirtanDto {
  @IsString()
  @IsNotEmpty()
  audioUrl: string;

  @IsString()
  @IsNotEmpty()
  singerName: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => QuoteDto)
  quoteAboutHarinam: QuoteDto[];

  @IsNumber()
  @Min(0)
  @Max(5)
  ratings: number;
}
