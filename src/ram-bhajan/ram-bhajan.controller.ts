import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import { RamBhajanService } from './ram-bhajan.service';
import { CreateRamBhajanDto } from './dto/create-ram-bhajan.dto';
import { UpdateRamBhajanDto } from './dto/update-ram-bhajan.dto';

@ApiTags('Ram Bhajan')
@Controller('ram-bhajan')
export class RamBhajanController {
  constructor(private readonly ramBhajanService: RamBhajanService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new Ram Bhajan category' })
  @ApiBody({ type: CreateRamBhajanDto })
  @ApiResponse({ status: 201, description: 'Created successfully.' })
  create(@Body() createDto: CreateRamBhajanDto) {
    return this.ramBhajanService.create(createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all Ram Bhajan categories' })
  @ApiResponse({ status: 200, description: 'List of Ram Bhajan categories.' })
  findAll() {
    return this.ramBhajanService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a Ram Bhajan category by ID' })
  @ApiParam({ name: 'id', description: 'Ram Bhajan ID' })
  @ApiResponse({ status: 200, description: 'Ram Bhajan found.' })
  findOne(@Param('id') id: string) {
    return this.ramBhajanService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a Ram Bhajan category by ID' })
  @ApiParam({ name: 'id', description: 'Ram Bhajan ID' })
  @ApiBody({ type: UpdateRamBhajanDto })
  @ApiResponse({ status: 200, description: 'Updated successfully.' })
  update(@Param('id') id: string, @Body() updateDto: UpdateRamBhajanDto) {
    return this.ramBhajanService.update(id, updateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a Ram Bhajan category by ID' })
  @ApiParam({ name: 'id', description: 'Ram Bhajan ID' })
  @ApiResponse({ status: 200, description: 'Deleted successfully.' })
  remove(@Param('id') id: string) {
    return this.ramBhajanService.remove(id);
  }
}
