import { Controller, Post, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SeedService } from './seed.service';

@ApiTags('Seed')
@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Post('books')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Seed sample books data into database' })
  @ApiResponse({ status: 200, description: 'Books seeded successfully' })
  @ApiResponse({ status: 400, description: 'Error seeding books' })
  async seedBooks() {
    await this.seedService.seedBooks();
    return { message: 'Books seeded successfully!' };
  }

  @Post('books/force')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Force seed books (clears existing data)' })
  @ApiResponse({ status: 200, description: 'Books force seeded successfully' })
  @ApiResponse({ status: 400, description: 'Error force seeding books' })
  async seedBooksForce() {
    await this.seedService.seedBooksForce();
    return { message: 'Books force seeded successfully!' };
  }

  @Post('books/bg/chapters')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Add additional chapters to Bhagavad Gita' })
  @ApiResponse({ status: 200, description: 'Chapters added successfully' })
  @ApiResponse({ status: 404, description: 'Bhagavad Gita book not found' })
  async seedBhagavadGitaChapters() {
    await this.seedService.seedBhagavadGitaChapters();
    return { message: 'Additional chapters added to Bhagavad Gita!' };
  }

  @Get('stats')
  @ApiOperation({ summary: 'Get database statistics after seeding' })
  @ApiResponse({ status: 200, description: 'Statistics retrieved successfully' })
  async getStats() {
    await this.seedService.getStats();
    return { message: 'Statistics logged to console' };
  }
}
