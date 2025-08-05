import { IsOptional, IsString, IsNumber, IsEnum, IsBoolean, Min, Max } from 'class-validator';
import { Type, Transform } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { BookCategory, BookStatus } from '../entities/book.schema';

export class QueryBooksDto {
  @ApiPropertyOptional({ description: 'Page number', default: 1, minimum: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({ description: 'Items per page', default: 10, minimum: 1, maximum: 100 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(100)
  limit?: number = 10;

  @ApiPropertyOptional({ description: 'Search term for title, description, or author' })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({ 
    description: 'Filter by category',
    enum: BookCategory
  })
  @IsOptional()
  @IsEnum(BookCategory)
  category?: BookCategory;

  @ApiPropertyOptional({ 
    description: 'Filter by status',
    enum: BookStatus
  })
  @IsOptional()
  @IsEnum(BookStatus)
  status?: BookStatus;

  @ApiPropertyOptional({ description: 'Filter by author' })
  @IsOptional()
  @IsString()
  author?: string;

  @ApiPropertyOptional({ description: 'Filter by tags (comma-separated)' })
  @IsOptional()
  @IsString()
  @Transform(({ value }) => value.split(',').map((tag: string) => tag.trim()))
  tags?: string[];

  @ApiPropertyOptional({ 
    description: 'Sort by field', 
    enum: ['title', 'createdAt', 'updatedAt', 'viewCount', 'author'],
    default: 'createdAt'
  })
  @IsOptional()
  @IsString()
  sortBy?: string = 'createdAt';

  @ApiPropertyOptional({ 
    description: 'Sort order', 
    enum: ['asc', 'desc'],
    default: 'desc'
  })
  @IsOptional()
  @IsString()
  sortOrder?: 'asc' | 'desc' = 'desc';

  @ApiPropertyOptional({ description: 'Include only active books', default: true })
  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  isActive?: boolean = true;

  @ApiPropertyOptional({ description: 'Include featured books only' })
  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  featured?: boolean;
}

export class QueryChaptersDto {
  @ApiPropertyOptional({ description: 'Page number', default: 1, minimum: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({ description: 'Items per page', default: 20, minimum: 1, maximum: 100 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(100)
  limit?: number = 20;

  @ApiPropertyOptional({ description: 'Search term for chapter title or description' })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({ description: 'Filter by tags (comma-separated)' })
  @IsOptional()
  @IsString()
  @Transform(({ value }) => value.split(',').map((tag: string) => tag.trim()))
  tags?: string[];
}

export class QueryVersesDto {
  @ApiPropertyOptional({ description: 'Page number', default: 1, minimum: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({ description: 'Items per page', default: 50, minimum: 1, maximum: 100 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(100)
  limit?: number = 50;

  @ApiPropertyOptional({ description: 'Search term for verse content' })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({ description: 'Include verses with audio only' })
  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  hasAudio?: boolean;

  @ApiPropertyOptional({ description: 'Include verses with purport only' })
  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  hasPurport?: boolean;

  @ApiPropertyOptional({ description: 'Include verses with Sanskrit text only' })
  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  hasSanskrit?: boolean;

  @ApiPropertyOptional({ description: 'Filter by tags (comma-separated)' })
  @IsOptional()
  @IsString()
  @Transform(({ value }) => value.split(',').map((tag: string) => tag.trim()))
  tags?: string[];
}
