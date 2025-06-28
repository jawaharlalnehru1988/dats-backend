import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BgSlokaService } from './bg-sloka.service';
import { CreateBgSlokaDto } from './dto/create-bg-sloka.dto';
import { UpdateBgSlokaDto } from './dto/update-bg-sloka.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';

@ApiTags('bg-sloka')
@Controller('bg-sloka')
export class BgSlokaController {
  constructor(private readonly bgSlokaService: BgSlokaService) {}

  @Post()
   @ApiOperation({ summary: 'Create BgSloka' })
  @ApiBody({ type: CreateBgSlokaDto })
  @ApiResponse({ status: 201, description: 'The sloka has been created.' })
  create(@Body() createBgSlokaDto: CreateBgSlokaDto) {
    return this.bgSlokaService.create(createBgSlokaDto);
  }

  @Get()
   @ApiOperation({ summary: 'Get all BgSlokas' })
  @ApiResponse({ status: 200, description: 'Return all slokas.' })
  findAll() {
    return this.bgSlokaService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get BgSloka by id' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'Return a sloka.' })
  findOne(@Param('id') id: string) {
    return this.bgSlokaService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update BgSloka' })
  @ApiParam({ name: 'id', type: String })
  @ApiBody({ type: UpdateBgSlokaDto })
  @ApiResponse({ status: 200, description: 'The sloka has been updated.' })
  update(@Param('id') id: string, @Body() updateBgSlokaDto: UpdateBgSlokaDto) {
    return this.bgSlokaService.update(id, updateBgSlokaDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete BgSloka' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'The sloka has been deleted.' })
  remove(@Param('id') id: string) {
    return this.bgSlokaService.remove(id);
  }
}
