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
  HttpCode,
  HttpStatus
} from '@nestjs/common';
import { 
  ApiTags, 
  ApiOperation, 
  ApiResponse, 
  ApiParam, 
  ApiQuery 
} from '@nestjs/swagger';
import { ChantingService } from './chanting.service';
import { CreateChantingDto } from './dto/create-chanting.dto';
import { UpdateChantingDto } from './dto/update-chanting.dto';
import { Chanting } from './entities/chanting.entity';

@ApiTags('chanting')
@Controller('chanting')
export class ChantingController {
  constructor(private readonly chantingService: ChantingService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new chanting' })
  @ApiResponse({ 
    status: 201, 
    description: 'The chanting has been successfully created.',
    type: Chanting
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  create(@Body(ValidationPipe) createChantingDto: CreateChantingDto): Promise<Chanting> {
    return this.chantingService.create(createChantingDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all chantings' })
  @ApiResponse({ 
    status: 200, 
    description: 'Return all published chantings',
    type: [Chanting]
  })
  findAll(): Promise<Chanting[]> {
    return this.chantingService.findAll();
  }

  @Get('search')
  @ApiOperation({ summary: 'Search chantings' })
  @ApiQuery({ name: 'q', description: 'Search query', required: true })
  @ApiResponse({ 
    status: 200, 
    description: 'Return search results',
    type: [Chanting]
  })
  search(@Query('q') query: string): Promise<Chanting[]> {
    return this.chantingService.searchChantings(query);
  }

  @Get('language/:language')
  @ApiOperation({ summary: 'Get chantings by language' })
  @ApiParam({ name: 'language', description: 'Language of the chanting' })
  @ApiResponse({ 
    status: 200, 
    description: 'Return chantings in specified language',
    type: [Chanting]
  })
  findByLanguage(@Param('language') language: string): Promise<Chanting[]> {
    return this.chantingService.findByLanguage(language);
  }

  @Get('author/:author')
  @ApiOperation({ summary: 'Get chantings by author' })
  @ApiParam({ name: 'author', description: 'Author of the chanting' })
  @ApiResponse({ 
    status: 200, 
    description: 'Return chantings by specified author',
    type: [Chanting]
  })
  findByAuthor(@Param('author') author: string): Promise<Chanting[]> {
    return this.chantingService.findByAuthor(author);
  }

  @Get('popular')
  @ApiOperation({ summary: 'Get popular chantings' })
  @ApiQuery({ name: 'limit', description: 'Number of chantings to return', required: false })
  @ApiResponse({ 
    status: 200, 
    description: 'Return most popular chantings',
    type: [Chanting]
  })
  getPopular(@Query('limit') limit?: number): Promise<Chanting[]> {
    return this.chantingService.getPopularChantings(limit);
  }

  @Get('recent')
  @ApiOperation({ summary: 'Get recent chantings' })
  @ApiQuery({ name: 'limit', description: 'Number of chantings to return', required: false })
  @ApiResponse({ 
    status: 200, 
    description: 'Return most recent chantings',
    type: [Chanting]
  })
  getRecent(@Query('limit') limit?: number): Promise<Chanting[]> {
    return this.chantingService.getRecentChantings(limit);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a chanting by id' })
  @ApiParam({ name: 'id', description: 'Chanting ID' })
  @ApiResponse({ 
    status: 200, 
    description: 'Return the chanting',
    type: Chanting
  })
  @ApiResponse({ status: 404, description: 'Chanting not found' })
  findOne(@Param('id') id: string): Promise<Chanting> {
    return this.chantingService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a chanting' })
  @ApiParam({ name: 'id', description: 'Chanting ID' })
  @ApiResponse({ 
    status: 200, 
    description: 'The chanting has been successfully updated',
    type: Chanting
  })
  @ApiResponse({ status: 404, description: 'Chanting not found' })
  update(
    @Param('id') id: string, 
    @Body(ValidationPipe) updateChantingDto: UpdateChantingDto
  ): Promise<Chanting> {
    return this.chantingService.update(id, updateChantingDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a chanting' })
  @ApiParam({ name: 'id', description: 'Chanting ID' })
  @ApiResponse({ status: 204, description: 'The chanting has been successfully deleted' })
  @ApiResponse({ status: 404, description: 'Chanting not found' })
  remove(@Param('id') id: string): Promise<void> {
    return this.chantingService.remove(id);
  }
}
