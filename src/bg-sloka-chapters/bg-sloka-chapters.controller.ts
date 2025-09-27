import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import { BgSlokaChaptersService } from './bg-sloka-chapters.service';
import { CreateBgSlokaChapterDto } from './dto/create-bg-sloka-chapter.dto';
import { UpdateBgSlokaChapterDto } from './dto/update-bg-sloka-chapter.dto';
import { BgSlokaChapter } from './entities/bg-sloka-chapter.schema';

@ApiTags('bg-sloka-chapters')
@Controller('bg-sloka-chapters')
export class BgSlokaChaptersController {
  constructor(private readonly service: BgSlokaChaptersService) {}

  // Public - Create new chapter (now open to everyone)
  @Post()
  @ApiOperation({ summary: 'Create a new chapter' })
  @ApiBody({ type: CreateBgSlokaChapterDto })
  @ApiResponse({ status: 201, type: BgSlokaChapter })
  create(@Body() dto: CreateBgSlokaChapterDto) {
    return this.service.create(dto);
  }

  // Public - Anyone can view chapters
  @Get()
  @ApiOperation({ summary: 'Get all chapters' })
  @ApiResponse({ status: 200, type: [BgSlokaChapter] })
  findAll() {
    return this.service.findAll();
  }

  // Public - Get slokas by category (e.g., tamil, hindi, etc.)
  @Get('category/:categoryName')
  @ApiOperation({ summary: 'Get chapters by category name' })
  @ApiParam({ 
    name: 'categoryName', 
    type: String,
    description: 'Category name (e.g., tamil for "Bhagavad Gita Tamil")',
    example: 'tamil'
  })
  @ApiResponse({ status: 200, type: [BgSlokaChapter] })
  findByCategory(@Param('categoryName') categoryName: string) {
    return this.service.findByCategory(categoryName);
  }

  // Public - Anyone can view a specific chapter
  @Get(':id')
  @ApiOperation({ summary: 'Get chapter by ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, type: BgSlokaChapter })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  // Public - Update chapter (now open to everyone)
  @Patch(':id')
  @ApiOperation({ summary: 'Update chapter by ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiBody({ type: UpdateBgSlokaChapterDto })
  @ApiResponse({ status: 200, type: BgSlokaChapter })
  update(@Param('id') id: string, @Body() dto: UpdateBgSlokaChapterDto) {
    return this.service.update(id, dto);
  }

  // Public - Delete chapter (now open to everyone)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete chapter by ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'Chapter deleted.' })
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
