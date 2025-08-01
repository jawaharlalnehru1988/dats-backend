import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  UseGuards,
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
import { AuthGuard } from '../auth/auth.guard';
import { Roles } from '../auth/roles.decorator';

@ApiTags('bg-sloka-chapters')
@Controller('bg-sloka-chapters')
export class BgSlokaChaptersController {
  constructor(private readonly service: BgSlokaChaptersService) {}

  // Admin only - Create new chapter
  @UseGuards(AuthGuard)
  @Roles('admin')
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

  // Public - Anyone can view a specific chapter
  @Get(':id')
  @ApiOperation({ summary: 'Get chapter by ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, type: BgSlokaChapter })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  // Admin only - Update chapter
  @UseGuards(AuthGuard)
  @Roles('admin')
  @Patch(':id')
  @ApiOperation({ summary: 'Update chapter by ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiBody({ type: UpdateBgSlokaChapterDto })
  @ApiResponse({ status: 200, type: BgSlokaChapter })
  update(@Param('id') id: string, @Body() dto: UpdateBgSlokaChapterDto) {
    return this.service.update(id, dto);
  }

  // Admin only - Delete chapter
  @UseGuards(AuthGuard)
  @Roles('admin')
  @Delete(':id')
  @ApiOperation({ summary: 'Delete chapter by ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'Chapter deleted.' })
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
