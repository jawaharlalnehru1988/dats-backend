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
  ValidationPipe 
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { HarekrishnaKirtanService } from './harekrishna-kirtan.service';
import { CreateHarekrishnaKirtanDto } from './dto/create-harekrishna-kirtan.dto';
import { UpdateHarekrishnaKirtanDto } from './dto/update-harekrishna-kirtan.dto';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@ApiTags('harekrishna-kirtan')
@Controller('harekrishna-kirtan')
export class HarekrishnaKirtanController {
  constructor(private readonly harekrishnaKirtanService: HarekrishnaKirtanService) {}

  // Admin only - Create new kirtan
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin')
  @Post()
  @ApiOperation({ summary: 'Create a new Harekrishna Kirtan' })
  @ApiResponse({ status: 201, description: 'Kirtan created successfully' })
  create(@Body(ValidationPipe) createDto: CreateHarekrishnaKirtanDto) {
    return this.harekrishnaKirtanService.create(createDto);
  }

  // Public - Get all kirtans
  @Get()
  @ApiOperation({ summary: 'Get all Harekrishna Kirtans' })
  @ApiResponse({ status: 200, description: 'List of all kirtans' })
  findAll() {
    return this.harekrishnaKirtanService.findAll();
  }

  // Public - Get kirtan by ID
  @Get(':id')
  @ApiOperation({ summary: 'Get Harekrishna Kirtan by ID' })
  @ApiResponse({ status: 200, description: 'Kirtan found' })
  @ApiResponse({ status: 404, description: 'Kirtan not found' })
  findOne(@Param('id') id: string) {
    return this.harekrishnaKirtanService.findOne(id);
  }

  // Public - Search by rating
  @Get('search/rating')
  @ApiOperation({ summary: 'Get kirtans by minimum rating' })
  @ApiQuery({ name: 'minRating', type: Number })
  findByRating(@Query('minRating') minRating: number) {
    return this.harekrishnaKirtanService.findByRating(minRating);
  }

  // Public - Search by singer
  @Get('search/singer')
  @ApiOperation({ summary: 'Get kirtans by singer name' })
  @ApiQuery({ name: 'name', type: String })
  findBySinger(@Query('name') singerName: string) {
    return this.harekrishnaKirtanService.findBySinger(singerName);
  }

  // Admin only - Update kirtan
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin')
  @Patch(':id')
  @ApiOperation({ summary: 'Update Harekrishna Kirtan by ID' })
  @ApiResponse({ status: 200, description: 'Kirtan updated successfully' })
  @ApiResponse({ status: 404, description: 'Kirtan not found' })
  update(@Param('id') id: string, @Body(ValidationPipe) updateDto: UpdateHarekrishnaKirtanDto) {
    return this.harekrishnaKirtanService.update(id, updateDto);
  }

  // Admin only - Delete kirtan
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin')
  @Delete(':id')
  @ApiOperation({ summary: 'Delete Harekrishna Kirtan by ID' })
  @ApiResponse({ status: 200, description: 'Kirtan deleted successfully' })
  @ApiResponse({ status: 404, description: 'Kirtan not found' })
  remove(@Param('id') id: string) {
    return this.harekrishnaKirtanService.remove(id);
  }
}
