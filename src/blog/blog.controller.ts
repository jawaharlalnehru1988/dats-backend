import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { BlogService } from './blog.service';
import { Blog } from './entities/blog.schema';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('blog')
@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new blog' })
  @ApiBody({ type: Blog })
  @ApiResponse({ status: 201, description: 'Blog created successfully.' })
  create(@Body() blogData: Partial<Blog>) {
    return this.blogService.create(blogData);
  }

  @Get()
  @ApiOperation({ summary: 'Get all blogs' })
  @ApiResponse({ status: 200, description: 'List of all blogs.' })
  findAll() {
    return this.blogService.findAll();
  }

  @Get(':id')
   @ApiOperation({ summary: 'Get a blog by ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'Blog found.' })
  findOne(@Param('id') id: string) {
    return this.blogService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a blog by ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiBody({ type: Blog })
  @ApiResponse({ status: 200, description: 'Blog updated successfully.' })
  update(@Param('id') id: string, @Body() blogData: Partial<Blog>) {
    return this.blogService.update(id, blogData);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a blog by ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'Blog deleted successfully.' })
  remove(@Param('id') id: string) {
    return this.blogService.remove(id);
  }
}