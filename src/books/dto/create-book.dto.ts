import { 
  IsString, 
  IsOptional, 
  IsNumber, 
  IsArray, 
  IsBoolean, 
  IsEnum, 
  IsDate, 
  ValidateNested, 
  IsUrl,
  Min,
  Max
} from 'class-validator';
import { Type, Transform } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { BookCategory, BookStatus } from '../entities/book.schema';

// Synonym DTO
export class CreateSynonymDto {
  @ApiProperty({ description: 'Sanskrit word' })
  @IsString()
  word: string;

  @ApiProperty({ description: 'Meaning of the word' })
  @IsString()
  meaning: string;

  @ApiPropertyOptional({ description: 'Link to word search' })
  @IsOptional()
  @IsString()
  link?: string;
}

// Audio Data DTO
export class CreateAudioDataDto {
  @ApiPropertyOptional({ description: 'Audio file URL' })
  @IsOptional()
  @IsUrl()
  audioUrl?: string;

  @ApiPropertyOptional({ description: 'Speaker name' })
  @IsOptional()
  @IsString()
  speaker?: string;

  @ApiPropertyOptional({ description: 'Audio duration in seconds' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  duration?: number;

  @ApiPropertyOptional({ description: 'Audio quality' })
  @IsOptional()
  @IsString()
  quality?: string;
}

// Verse DTO
export class CreateVerseDto {
  @ApiProperty({ description: 'Verse number (e.g., "1.1", "2.15")', example: '1.1' })
  @IsString()
  verseNumber: string;

  @ApiProperty({ description: 'Sequential order within chapter' })
  @IsNumber()
  @Min(1)
  orderNumber: number;

  @ApiPropertyOptional({ description: 'Original Sanskrit text' })
  @IsOptional()
  @IsString()
  sanskritText?: string;

  @ApiPropertyOptional({ description: 'Romanized Sanskrit' })
  @IsOptional()
  @IsString()
  transliteration?: string;

  @ApiProperty({ description: 'English translation' })
  @IsString()
  translation: string;

  @ApiPropertyOptional({ description: 'Detailed explanation/commentary' })
  @IsOptional()
  @IsString()
  purport?: string;

  @ApiPropertyOptional({ description: 'Word meanings', type: [CreateSynonymDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateSynonymDto)
  synonyms?: CreateSynonymDto[];

  @ApiPropertyOptional({ description: 'Audio data for verse' })
  @IsOptional()
  @ValidateNested()
  @Type(() => CreateAudioDataDto)
  audio?: CreateAudioDataDto;

  @ApiPropertyOptional({ description: 'Word-for-word translation' })
  @IsOptional()
  @IsString()
  wordForWord?: string;

  @ApiPropertyOptional({ description: 'Tags for categorization' })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];
}

// Chapter DTO
export class CreateChapterDto {
  @ApiProperty({ description: 'Chapter number' })
  @IsNumber()
  @Min(1)
  chapterNumber: number;

  @ApiProperty({ description: 'Chapter title' })
  @IsString()
  title: string;

  @ApiPropertyOptional({ description: 'Chapter subtitle' })
  @IsOptional()
  @IsString()
  subtitle?: string;

  @ApiPropertyOptional({ description: 'Chapter description/summary' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ description: 'Chapter introduction' })
  @IsOptional()
  @IsString()
  introduction?: string;

  @ApiPropertyOptional({ description: 'Chapter verses', type: [CreateVerseDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateVerseDto)
  verses?: CreateVerseDto[];

  @ApiPropertyOptional({ description: 'Total verses in chapter' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  verseCount?: number;

  @ApiPropertyOptional({ description: 'Chapter tags' })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];
}

// Book Metadata DTO
export class CreateBookMetadataDto {
  @ApiPropertyOptional({ description: 'ISBN number' })
  @IsOptional()
  @IsString()
  isbn?: string;

  @ApiPropertyOptional({ description: 'Publisher name' })
  @IsOptional()
  @IsString()
  publisher?: string;

  @ApiPropertyOptional({ description: 'Publication date' })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  publishedDate?: Date;

  @ApiPropertyOptional({ description: 'Edition' })
  @IsOptional()
  @IsString()
  edition?: string;

  @ApiPropertyOptional({ description: 'Number of pages' })
  @IsOptional()
  @IsNumber()
  @Min(1)
  pageCount?: number;

  @ApiPropertyOptional({ description: 'Book language' })
  @IsOptional()
  @IsString()
  language?: string;

  @ApiPropertyOptional({ description: 'Translator names' })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  translators?: string[];

  @ApiPropertyOptional({ description: 'Original language' })
  @IsOptional()
  @IsString()
  originalLanguage?: string;

  @ApiPropertyOptional({ description: 'Copyright information' })
  @IsOptional()
  @IsString()
  copyright?: string;
}

// Main Book Create DTO
export class CreateBookDto {
  @ApiProperty({ description: 'Book title', example: 'Bhagavad-gītā As It Is' })
  @IsString()
  title: string;

  @ApiProperty({ description: 'URL-friendly identifier', example: 'bg' })
  @IsString()
  @Transform(({ value }) => value.toLowerCase().replace(/[^a-z0-9-]/g, '-'))
  slug: string;

  @ApiPropertyOptional({ description: 'Book subtitle' })
  @IsOptional()
  @IsString()
  subtitle?: string;

  @ApiProperty({ description: 'Book description/summary' })
  @IsString()
  description: string;

  @ApiPropertyOptional({ description: 'Cover image URL' })
  @IsOptional()
  @IsUrl()
  coverImageUrl?: string;

  @ApiProperty({ description: 'Author name', example: 'A.C. Bhaktivedanta Swami Prabhupāda' })
  @IsString()
  author: string;

  @ApiProperty({ 
    description: 'Book category',
    enum: BookCategory,
    example: BookCategory.BHAGAVAD_GITA
  })
  @IsEnum(BookCategory)
  category: BookCategory;

  @ApiPropertyOptional({ 
    description: 'Book status',
    enum: BookStatus,
    default: BookStatus.DRAFT
  })
  @IsOptional()
  @IsEnum(BookStatus)
  status?: BookStatus;

  @ApiPropertyOptional({ description: 'Book chapters', type: [CreateChapterDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateChapterDto)
  chapters?: CreateChapterDto[];

  @ApiPropertyOptional({ description: 'Total chapters in book' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  chapterCount?: number;

  @ApiPropertyOptional({ description: 'Total verses across all chapters' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  totalVerses?: number;

  @ApiPropertyOptional({ description: 'Book metadata' })
  @IsOptional()
  @ValidateNested()
  @Type(() => CreateBookMetadataDto)
  metadata?: CreateBookMetadataDto;

  @ApiPropertyOptional({ description: 'Book preface' })
  @IsOptional()
  @IsString()
  preface?: string;

  @ApiPropertyOptional({ description: 'Book introduction' })
  @IsOptional()
  @IsString()
  introduction?: string;

  @ApiPropertyOptional({ description: 'Book dedication' })
  @IsOptional()
  @IsString()
  dedication?: string;

  @ApiPropertyOptional({ description: 'Setting the scene section' })
  @IsOptional()
  @IsString()
  settingTheScene?: string;

  @ApiPropertyOptional({ description: 'Book tags' })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @ApiPropertyOptional({ description: 'Featured until date' })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  featuredUntil?: Date;

  @ApiPropertyOptional({ description: 'Allow comments on book', default: false })
  @IsOptional()
  @IsBoolean()
  allowComments?: boolean;

  @ApiPropertyOptional({ description: 'Allow book download', default: false })
  @IsOptional()
  @IsBoolean()
  allowDownload?: boolean;

  @ApiPropertyOptional({ description: 'SEO meta title' })
  @IsOptional()
  @IsString()
  metaTitle?: string;

  @ApiPropertyOptional({ description: 'SEO meta description' })
  @IsOptional()
  @IsString()
  metaDescription?: string;

  @ApiPropertyOptional({ description: 'SEO meta keywords' })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  metaKeywords?: string[];
}
