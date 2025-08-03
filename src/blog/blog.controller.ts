import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { AddCommentDto } from './dto/add-comment.dto';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';


@ApiTags('blog')
@Controller('blog')

export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  // Admin only - Create new blog
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin')
  @Post()
  @ApiOperation({ summary: 'Create a new blog' })
  @ApiBody({ type: CreateBlogDto })
  @ApiResponse({ status: 201, description: 'Blog created successfully.' })
  create(@Body(ValidationPipe) createBlogDto: CreateBlogDto) {
    return this.blogService.create(createBlogDto);
  }

  // Public - Get all blogs
  @Get()
  @ApiOperation({ summary: 'Get all blogs' })
  @ApiResponse({ status: 200, description: 'List of all blogs.' })
  findAll() {
    return this.blogService.findAll();
  }

  // Public - Get blog by ID
  @Get(':id')
  @ApiOperation({ summary: 'Get a blog by ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'Blog found.' })
  @ApiResponse({ status: 404, description: 'Blog not found.' })
  findOne(@Param('id') id: string) {
    return this.blogService.findOne(id);
  }

  // Public - Search blogs
  @Get('search/query')
  @ApiOperation({ summary: 'Search blogs by title or author' })
  @ApiQuery({ name: 'q', type: String, description: 'Search query' })
  @ApiResponse({ status: 200, description: 'Search results.' })
  searchBlogs(@Query('q') query: string) {
    return this.blogService.searchBlogs(query);
  }

  // Public - Get blogs by author
  @Get('author/:author')
  @ApiOperation({ summary: 'Get blogs by author' })
  @ApiParam({ name: 'author', type: String })
  @ApiResponse({ status: 200, description: 'Blogs by author.' })
  getBlogsByAuthor(@Param('author') author: string) {
    return this.blogService.getBlogsByAuthor(author);
  }

  // Admin only - Update blog
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin')
  @Patch(':id')
  @ApiOperation({ summary: 'Update a blog by ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiBody({ type: UpdateBlogDto })
  @ApiResponse({ status: 200, description: 'Blog updated successfully.' })
  @ApiResponse({ status: 404, description: 'Blog not found.' })
  update(@Param('id') id: string, @Body(ValidationPipe) updateBlogDto: UpdateBlogDto) {
    return this.blogService.update(id, updateBlogDto);
  }

  // Public - Add comment to blog
  @Post(':id/comments')
  @ApiOperation({ summary: 'Add a comment to a blog' })
  @ApiParam({ name: 'id', type: String })
  @ApiBody({ type: AddCommentDto })
  @ApiResponse({ status: 200, description: 'Comment added successfully.' })
  @ApiResponse({ status: 404, description: 'Blog not found.' })
  addComment(@Param('id') id: string, @Body(ValidationPipe) addCommentDto: AddCommentDto) {
    return this.blogService.addComment(id, addCommentDto);
  }

  // Admin only - Remove comment from blog
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin')
  @Delete(':blogId/comments/:commentIndex')
  @ApiOperation({ summary: 'Remove a comment from a blog' })
  @ApiParam({ name: 'blogId', type: String })
  @ApiParam({ name: 'commentIndex', type: Number })
  @ApiResponse({ status: 200, description: 'Comment removed successfully.' })
  @ApiResponse({ status: 404, description: 'Blog or comment not found.' })
  removeComment(@Param('blogId') blogId: string, @Param('commentIndex') commentIndex: string) {
    return this.blogService.removeComment(blogId, parseInt(commentIndex));
  }

  // Admin only - Delete blog
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin')
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a blog by ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'Blog deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Blog not found.' })
  remove(@Param('id') id: string) {
    return this.blogService.remove(id);
  }
}
