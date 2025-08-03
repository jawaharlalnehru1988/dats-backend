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
import { VideosService } from './videos.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { AddVideoCommentDto } from './dto/add-comment.dto';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@ApiTags('videos')
@Controller('videos')
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  // Admin only - Create new video
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin')
  @Post()
  @ApiOperation({ summary: 'Create a new video' })
  @ApiResponse({ status: 201, description: 'Video created successfully' })
  create(@Body(ValidationPipe) createVideoDto: CreateVideoDto) {
    return this.videosService.create(createVideoDto);
  }

  // Public - Get all videos
  @Get()
  @ApiOperation({ summary: 'Get all videos' })
  @ApiResponse({ status: 200, description: 'List of all videos' })
  findAll() {
    return this.videosService.findAll();
  }

  // Public - Get video by ID
  @Get(':id')
  @ApiOperation({ summary: 'Get video by ID' })
  @ApiResponse({ status: 200, description: 'Video found' })
  @ApiResponse({ status: 404, description: 'Video not found' })
  findOne(@Param('id') id: string) {
    return this.videosService.findOne(id);
  }

  // Public - Search by title
  @Get('search/title')
  @ApiOperation({ summary: 'Search videos by title' })
  @ApiQuery({ name: 'title', type: String })
  findByTitle(@Query('title') title: string) {
    return this.videosService.findByTitle(title);
  }

  // Public - Search by description
  @Get('search/description')
  @ApiOperation({ summary: 'Search videos by description' })
  @ApiQuery({ name: 'description', type: String })
  findByDescription(@Query('description') description: string) {
    return this.videosService.findByDescription(description);
  }

  // Admin only - Update video
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin')
  @Patch(':id')
  @ApiOperation({ summary: 'Update video by ID' })
  @ApiResponse({ status: 200, description: 'Video updated successfully' })
  @ApiResponse({ status: 404, description: 'Video not found' })
  update(@Param('id') id: string, @Body(ValidationPipe) updateVideoDto: UpdateVideoDto) {
    return this.videosService.update(id, updateVideoDto);
  }

  // Public - Add comment to video
  @Post(':id/comments')
  @ApiOperation({ summary: 'Add comment to video' })
  @ApiResponse({ status: 200, description: 'Comment added successfully' })
  @ApiResponse({ status: 404, description: 'Video not found' })
  addComment(@Param('id') id: string, @Body(ValidationPipe) addCommentDto: AddVideoCommentDto) {
    return this.videosService.addComment(id, addCommentDto);
  }

  // Admin only - Remove comment from video
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin')
  @Delete(':id/comments/:commentIndex')
  @ApiOperation({ summary: 'Remove comment from video' })
  @ApiResponse({ status: 200, description: 'Comment removed successfully' })
  @ApiResponse({ status: 404, description: 'Video or comment not found' })
  removeComment(@Param('id') id: string, @Param('commentIndex') commentIndex: string) {
    return this.videosService.removeComment(id, parseInt(commentIndex));
  }

  // Admin only - Delete video
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin')
  @Delete(':id')
  @ApiOperation({ summary: 'Delete video by ID' })
  @ApiResponse({ status: 200, description: 'Video deleted successfully' })
  @ApiResponse({ status: 404, description: 'Video not found' })
  remove(@Param('id') id: string) {
    return this.videosService.remove(id);
  }
}
