import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  HttpStatus,
  HttpCode,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { BooksService } from './books.service';
import { 
  CreateBookDto, 
  UpdateBookDto, 
  QueryBooksDto, 
  QueryChaptersDto, 
  QueryVersesDto 
} from './dto';

@ApiTags('Books')
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new book' })
  @ApiResponse({ status: 201, description: 'Book successfully created' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @ApiResponse({ status: 409, description: 'Book with slug already exists' })
  // @UseGuards(AuthGuard) // Uncomment when auth is implemented
  // @ApiBearerAuth()
  async create(@Body() createBookDto: CreateBookDto) {
    return await this.booksService.create(createBookDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all books with pagination and filtering' })
  @ApiResponse({ status: 200, description: 'Books retrieved successfully' })
  async findAll(@Query() queryDto: QueryBooksDto) {
    return await this.booksService.findAll(queryDto);
  }

  @Get('search')
  @ApiOperation({ summary: 'Global search across books, chapters, and verses' })
  @ApiResponse({ status: 200, description: 'Search results retrieved successfully' })
  @ApiQuery({ name: 'q', description: 'Search term' })
  @ApiQuery({ name: 'page', required: false, description: 'Page number' })
  @ApiQuery({ name: 'limit', required: false, description: 'Items per page' })
  async globalSearch(
    @Query('q') searchTerm: string,
    @Query('page') page = 1,
    @Query('limit') limit = 20,
  ) {
    return await this.booksService.globalSearch(searchTerm, page, limit);
  }

  @Get('statistics')
  @ApiOperation({ summary: 'Get book statistics' })
  @ApiResponse({ status: 200, description: 'Statistics retrieved successfully' })
  async getStatistics() {
    return await this.booksService.getStatistics();
  }

  @Get(':slug')
  @ApiOperation({ summary: 'Get book by slug' })
  @ApiResponse({ status: 200, description: 'Book retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Book not found' })
  @ApiParam({ name: 'slug', description: 'Book slug (e.g., "bg", "sb")' })
  async findBySlug(@Param('slug') slug: string) {
    return await this.booksService.findBySlug(slug);
  }

  @Get(':slug/chapters')
  @ApiOperation({ summary: 'Get chapters of a book with pagination' })
  @ApiResponse({ status: 200, description: 'Chapters retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Book not found' })
  @ApiParam({ name: 'slug', description: 'Book slug' })
  async findChapters(
    @Param('slug') slug: string,
    @Query() queryDto: QueryChaptersDto,
  ) {
    return await this.booksService.findChapters(slug, queryDto);
  }

  @Get(':slug/chapters/:chapterNumber')
  @ApiOperation({ summary: 'Get specific chapter from a book' })
  @ApiResponse({ status: 200, description: 'Chapter retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Book or chapter not found' })
  @ApiParam({ name: 'slug', description: 'Book slug' })
  @ApiParam({ name: 'chapterNumber', description: 'Chapter number' })
  async findChapter(
    @Param('slug') slug: string,
    @Param('chapterNumber', ParseIntPipe) chapterNumber: number,
  ) {
    return await this.booksService.findChapter(slug, chapterNumber);
  }

  @Get(':slug/chapters/:chapterNumber/verses')
  @ApiOperation({ summary: 'Get verses of a chapter with pagination' })
  @ApiResponse({ status: 200, description: 'Verses retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Book or chapter not found' })
  @ApiParam({ name: 'slug', description: 'Book slug' })
  @ApiParam({ name: 'chapterNumber', description: 'Chapter number' })
  async findVerses(
    @Param('slug') slug: string,
    @Param('chapterNumber', ParseIntPipe) chapterNumber: number,
    @Query() queryDto: QueryVersesDto,
  ) {
    return await this.booksService.findVerses(slug, chapterNumber, queryDto);
  }

  @Get(':slug/chapters/:chapterNumber/verses/:verseNumber')
  @ApiOperation({ summary: 'Get specific verse from a chapter' })
  @ApiResponse({ status: 200, description: 'Verse retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Book, chapter, or verse not found' })
  @ApiParam({ name: 'slug', description: 'Book slug' })
  @ApiParam({ name: 'chapterNumber', description: 'Chapter number' })
  @ApiParam({ name: 'verseNumber', description: 'Verse number (e.g., "1", "16-18")' })
  async findVerse(
    @Param('slug') slug: string,
    @Param('chapterNumber', ParseIntPipe) chapterNumber: number,
    @Param('verseNumber') verseNumber: string,
  ) {
    return await this.booksService.findVerse(slug, chapterNumber, verseNumber);
  }

  @Get('id/:id')
  @ApiOperation({ summary: 'Get book by ID (admin use)' })
  @ApiResponse({ status: 200, description: 'Book retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Book not found' })
  @ApiParam({ name: 'id', description: 'Book ID' })
  // @UseGuards(AuthGuard) // Uncomment when auth is implemented
  // @ApiBearerAuth()
  async findOne(@Param('id') id: string) {
    return await this.booksService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update book by ID' })
  @ApiResponse({ status: 200, description: 'Book updated successfully' })
  @ApiResponse({ status: 404, description: 'Book not found' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @ApiResponse({ status: 409, description: 'Book with slug already exists' })
  @ApiParam({ name: 'id', description: 'Book ID' })
  // @UseGuards(AuthGuard) // Uncomment when auth is implemented
  // @ApiBearerAuth()
  async update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return await this.booksService.update(id, updateBookDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete book (deactivate)' })
  @ApiResponse({ status: 200, description: 'Book deactivated successfully' })
  @ApiResponse({ status: 404, description: 'Book not found' })
  @ApiParam({ name: 'id', description: 'Book ID' })
  @HttpCode(HttpStatus.OK)
  // @UseGuards(AuthGuard) // Uncomment when auth is implemented
  // @ApiBearerAuth()
  async remove(@Param('id') id: string) {
    return await this.booksService.remove(id);
  }

  @Delete(':id/permanent')
  @ApiOperation({ summary: 'Permanently delete book' })
  @ApiResponse({ status: 200, description: 'Book permanently deleted' })
  @ApiResponse({ status: 404, description: 'Book not found' })
  @ApiParam({ name: 'id', description: 'Book ID' })
  @HttpCode(HttpStatus.OK)
  // @UseGuards(AuthGuard, RolesGuard) // Uncomment when auth is implemented
  // @Roles('admin') // Only admin can permanently delete
  // @ApiBearerAuth()
  async hardDelete(@Param('id') id: string) {
    return await this.booksService.hardDelete(id);
  }

  // Additional endpoints for managing chapters and verses

  @Post(':id/chapters')
  @ApiOperation({ summary: 'Add chapter to book' })
  @ApiResponse({ status: 201, description: 'Chapter added successfully' })
  @ApiResponse({ status: 404, description: 'Book not found' })
  @ApiResponse({ status: 409, description: 'Chapter number already exists' })
  @ApiParam({ name: 'id', description: 'Book ID' })
  // @UseGuards(AuthGuard) // Uncomment when auth is implemented
  // @ApiBearerAuth()
  async addChapter(
    @Param('id') id: string,
    @Body() chapterData: any, // You can create a specific DTO for this
  ) {
    return await this.booksService.addChapter(id, chapterData);
  }

  @Post(':id/chapters/:chapterNumber/verses')
  @ApiOperation({ summary: 'Add verse to chapter' })
  @ApiResponse({ status: 201, description: 'Verse added successfully' })
  @ApiResponse({ status: 404, description: 'Book or chapter not found' })
  @ApiResponse({ status: 409, description: 'Verse number already exists' })
  @ApiParam({ name: 'id', description: 'Book ID' })
  @ApiParam({ name: 'chapterNumber', description: 'Chapter number' })
  // @UseGuards(AuthGuard) // Uncomment when auth is implemented
  // @ApiBearerAuth()
  async addVerse(
    @Param('id') id: string,
    @Param('chapterNumber', ParseIntPipe) chapterNumber: number,
    @Body() verseData: any, // You can create a specific DTO for this
  ) {
    return await this.booksService.addVerse(id, chapterNumber, verseData);
  }
}
