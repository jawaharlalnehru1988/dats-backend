import { Controller, Post, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SeedService } from './seed.service';

@ApiTags('Seed')
@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Post('data')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Seed sample data into database' })
  @ApiResponse({ status: 200, description: 'Data seeded successfully' })
  @ApiResponse({ status: 400, description: 'Error seeding data' })
  async seedData() {
    await this.seedService.seedData();
    return { message: 'Data seeded successfully!' };
  }

  @Get('stats')
  @ApiOperation({ summary: 'Get database statistics after seeding' })
  @ApiResponse({ status: 200, description: 'Statistics retrieved successfully' })
  async getStats() {
    await this.seedService.getStats();
    return { message: 'Statistics logged to console' };
  }
}
