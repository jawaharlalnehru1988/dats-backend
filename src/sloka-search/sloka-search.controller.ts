import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { SlokaSearchService } from './sloka-search.service';
import { CreateSlokaSearchDto } from './dto/create-sloka-search.dto';
import { UpdateSlokaSearchDto } from './dto/update-sloka-search.dto';
import { SlokaSearch } from './entities/sloka-search.entity';

@ApiTags('sloka-search')
@Controller('sloka-search')
export class SlokaSearchController {
  constructor(private readonly slokaSearchService: SlokaSearchService) {}

  // Public - Create new sloka
  @Post()
  @ApiOperation({ summary: 'Create a new sloka' })
  @ApiBody({ type: CreateSlokaSearchDto })
  @ApiResponse({ status: 201, type: SlokaSearch })
  @ApiResponse({ status: 400, description: 'Bad request' })
  create(@Body(ValidationPipe) createSlokaSearchDto: CreateSlokaSearchDto): Promise<SlokaSearch> {
    return this.slokaSearchService.create(createSlokaSearchDto);
  }

  // Public - Get all published slokas
  @Get()
  @ApiOperation({ summary: 'Get all published slokas' })
  @ApiResponse({ status: 200, type: [SlokaSearch] })
  findAll(): Promise<SlokaSearch[]> {
    return this.slokaSearchService.findAll();
  }

  // Public - Search slokas
  @Get('search')
  @ApiOperation({ summary: 'Search slokas by text content' })
  @ApiQuery({ name: 'q', description: 'Search query', example: 'dharma', required: true })
  @ApiResponse({ status: 200, type: [SlokaSearch] })
  search(@Query('q') query: string): Promise<SlokaSearch[]> {
    return this.slokaSearchService.search(query);
  }

  // Public - Get popular slokas
  @Get('popular')
  @ApiOperation({ summary: 'Get popular slokas by view count' })
  @ApiQuery({ name: 'limit', required: false, description: 'Number of slokas to return', example: 10 })
  @ApiResponse({ status: 200, type: [SlokaSearch] })
  getPopular(@Query('limit') limit?: string): Promise<SlokaSearch[]> {
    const limitNum = limit ? parseInt(limit, 10) : 10;
    return this.slokaSearchService.getPopularSlokas(limitNum);
  }

  // Public - Get recent slokas
  @Get('recent')
  @ApiOperation({ summary: 'Get recently added slokas' })
  @ApiQuery({ name: 'limit', required: false, description: 'Number of slokas to return', example: 10 })
  @ApiResponse({ status: 200, type: [SlokaSearch] })
  getRecent(@Query('limit') limit?: string): Promise<SlokaSearch[]> {
    const limitNum = limit ? parseInt(limit, 10) : 10;
    return this.slokaSearchService.getRecentSlokas(limitNum);
  }

  // Public - Get slokas by chapter
  @Get('chapter/:chapterNo')
  @ApiOperation({ summary: 'Get all slokas from a specific chapter' })
  @ApiParam({ name: 'chapterNo', type: Number, description: 'Chapter number', example: 1 })
  @ApiResponse({ status: 200, type: [SlokaSearch] })
  findByChapter(@Param('chapterNo') chapterNo: string): Promise<SlokaSearch[]> {
    return this.slokaSearchService.findByChapter(parseInt(chapterNo, 10));
  }

  // Public - Get specific sloka by chapter and sloka number
  @Get('chapter/:chapterNo/sloka/:slokaNo')
  @ApiOperation({ summary: 'Get specific sloka by chapter and sloka number' })
  @ApiParam({ name: 'chapterNo', type: Number, description: 'Chapter number', example: 1 })
  @ApiParam({ name: 'slokaNo', type: Number, description: 'Sloka number', example: 1 })
  @ApiResponse({ status: 200, type: SlokaSearch })
  @ApiResponse({ status: 404, description: 'Sloka not found' })
  findByChapterAndSloka(
    @Param('chapterNo') chapterNo: string,
    @Param('slokaNo') slokaNo: string,
  ): Promise<SlokaSearch> {
    return this.slokaSearchService.findByChapterAndSloka(
      parseInt(chapterNo, 10),
      parseInt(slokaNo, 10),
    );
  }

  // Public - Get sloka by ID (increments view count)
  @Get(':id')
  @ApiOperation({ summary: 'Get sloka by ID (increments view count)' })
  @ApiParam({ name: 'id', type: String, description: 'Sloka ID' })
  @ApiResponse({ status: 200, type: SlokaSearch })
  @ApiResponse({ status: 404, description: 'Sloka not found' })
  findOne(@Param('id') id: string): Promise<SlokaSearch> {
    return this.slokaSearchService.findOne(id);
  }

  // Public - Update sloka
  @Patch(':id')
  @ApiOperation({ summary: 'Update sloka by ID' })
  @ApiParam({ name: 'id', type: String, description: 'Sloka ID' })
  @ApiBody({ type: UpdateSlokaSearchDto })
  @ApiResponse({ status: 200, type: SlokaSearch })
  @ApiResponse({ status: 404, description: 'Sloka not found' })
  update(
    @Param('id') id: string, 
    @Body(ValidationPipe) updateSlokaSearchDto: UpdateSlokaSearchDto
  ): Promise<SlokaSearch> {
    return this.slokaSearchService.update(id, updateSlokaSearchDto);
  }

  // Public - Delete sloka
  @Delete(':id')
  @ApiOperation({ summary: 'Delete sloka by ID' })
  @ApiParam({ name: 'id', type: String, description: 'Sloka ID' })
  @ApiResponse({ status: 200, description: 'Sloka deleted successfully' })
  @ApiResponse({ status: 404, description: 'Sloka not found' })
  remove(@Param('id') id: string): Promise<SlokaSearch> {
    return this.slokaSearchService.remove(id);
  }
}
