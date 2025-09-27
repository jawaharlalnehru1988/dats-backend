import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { AddCommentDto } from './dto/add-comment.dto';
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

  // Public - Create new blog (now open to everyone)
  @Post()
  @ApiOperation({ summary: 'Create a new blog' })
  @ApiBody({ type: CreateBlogDto })
  @ApiResponse({ status: 201, description: 'Blog created successfully.' })
  create(@Body(ValidationPipe) createBlogDto: CreateBlogDto) {
    return this.blogService.create(createBlogDto);
  }

  // Public - Create new blog in specific language (now open to everyone)
  @Post(':language')
  @ApiOperation({ summary: 'Create a new blog in specific language' })
  @ApiParam({ name: 'language', type: String, description: 'Language code (tamil, telugu, hindi, etc.)' })
  @ApiBody({ type: CreateBlogDto })
  @ApiResponse({ status: 201, description: 'Blog created successfully.' })
  createInLanguage(@Param('language') language: string, @Body(ValidationPipe) createBlogDto: CreateBlogDto) {
    return this.blogService.create(createBlogDto, language);
  }

  // Public - Get all blogs (default)
  @Get()
  @ApiOperation({ summary: 'Get all blogs' })
  @ApiResponse({ status: 200, description: 'List of all blogs.' })
  findAll() {
    return this.blogService.findAll();
  }

  // Public - Get all blogs in specific language
  @Get(':language')
  @ApiOperation({ summary: 'Get all blogs in specific language' })
  @ApiParam({ name: 'language', type: String, description: 'Language code (tamil, telugu, hindi, etc.)' })
  @ApiResponse({ status: 200, description: 'List of all blogs in specific language.' })
  findAllInLanguage(@Param('language') language: string) {
    return this.blogService.findAll(language);
  }

  // Public - Get blog by ID (default)
  @Get('post/:id')
  @ApiOperation({ summary: 'Get a blog by ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'Blog found.' })
  @ApiResponse({ status: 404, description: 'Blog not found.' })
  findOne(@Param('id') id: string) {
    return this.blogService.findOne(id);
  }

  // Public - Get blog by ID in specific language
  @Get(':language/post/:id')
  @ApiOperation({ summary: 'Get a blog by ID in specific language' })
  @ApiParam({ name: 'language', type: String, description: 'Language code' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'Blog found.' })
  @ApiResponse({ status: 404, description: 'Blog not found.' })
  findOneInLanguage(@Param('language') language: string, @Param('id') id: string) {
    return this.blogService.findOne(id, language);
  }

  // Public - Search blogs (default)
  @Get('search/query')
  @ApiOperation({ summary: 'Search blogs by title or author' })
  @ApiQuery({ name: 'q', type: String, description: 'Search query' })
  @ApiResponse({ status: 200, description: 'Search results.' })
  searchBlogs(@Query('q') query: string) {
    return this.blogService.searchBlogs(query);
  }

  // Public - Search blogs in specific language
  @Get(':language/search/query')
  @ApiOperation({ summary: 'Search blogs by title or author in specific language' })
  @ApiParam({ name: 'language', type: String, description: 'Language code' })
  @ApiQuery({ name: 'q', type: String, description: 'Search query' })
  @ApiResponse({ status: 200, description: 'Search results.' })
  searchBlogsInLanguage(@Param('language') language: string, @Query('q') query: string) {
    return this.blogService.searchBlogs(query, language);
  }

  // Public - Get blogs by author (default)
  @Get('author/:author')
  @ApiOperation({ summary: 'Get blogs by author' })
  @ApiParam({ name: 'author', type: String })
  @ApiResponse({ status: 200, description: 'Blogs by author.' })
  getBlogsByAuthor(@Param('author') author: string) {
    return this.blogService.getBlogsByAuthor(author);
  }

  // Public - Get blogs by author in specific language
  @Get(':language/author/:author')
  @ApiOperation({ summary: 'Get blogs by author in specific language' })
  @ApiParam({ name: 'language', type: String, description: 'Language code' })
  @ApiParam({ name: 'author', type: String })
  @ApiResponse({ status: 200, description: 'Blogs by author.' })
  getBlogsByAuthorInLanguage(@Param('language') language: string, @Param('author') author: string) {
    return this.blogService.getBlogsByAuthor(author, language);
  }

  // Public - Update blog (now open to everyone)
  @Patch('post/:id')
  @ApiOperation({ summary: 'Update a blog by ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiBody({ type: UpdateBlogDto })
  @ApiResponse({ status: 200, description: 'Blog updated successfully.' })
  @ApiResponse({ status: 404, description: 'Blog not found.' })
  update(@Param('id') id: string, @Body(ValidationPipe) updateBlogDto: UpdateBlogDto) {
    return this.blogService.update(id, updateBlogDto);
  }

  // Public - Update blog in specific language
  @Patch(':language/post/:id')
  @ApiOperation({ summary: 'Update a blog by ID in specific language' })
  @ApiParam({ name: 'language', type: String, description: 'Language code' })
  @ApiParam({ name: 'id', type: String })
  @ApiBody({ type: UpdateBlogDto })
  @ApiResponse({ status: 200, description: 'Blog updated successfully.' })
  @ApiResponse({ status: 404, description: 'Blog not found.' })
  updateInLanguage(@Param('language') language: string, @Param('id') id: string, @Body(ValidationPipe) updateBlogDto: UpdateBlogDto) {
    return this.blogService.update(id, updateBlogDto, language);
  }

  // Public - Add comment to blog (default)
  @Post('post/:id/comments')
  @ApiOperation({ summary: 'Add a comment to a blog' })
  @ApiParam({ name: 'id', type: String })
  @ApiBody({ type: AddCommentDto })
  @ApiResponse({ status: 200, description: 'Comment added successfully.' })
  @ApiResponse({ status: 404, description: 'Blog not found.' })
  addComment(@Param('id') id: string, @Body(ValidationPipe) addCommentDto: AddCommentDto) {
    return this.blogService.addComment(id, addCommentDto);
  }

  // Public - Add comment to blog in specific language
  @Post(':language/post/:id/comments')
  @ApiOperation({ summary: 'Add a comment to a blog in specific language' })
  @ApiParam({ name: 'language', type: String, description: 'Language code' })
  @ApiParam({ name: 'id', type: String })
  @ApiBody({ type: AddCommentDto })
  @ApiResponse({ status: 200, description: 'Comment added successfully.' })
  @ApiResponse({ status: 404, description: 'Blog not found.' })
  addCommentInLanguage(@Param('language') language: string, @Param('id') id: string, @Body(ValidationPipe) addCommentDto: AddCommentDto) {
    return this.blogService.addComment(id, addCommentDto, language);
  }

  // Public - Remove comment from blog (default)
  @Delete('post/:blogId/comments/:commentIndex')
  @ApiOperation({ summary: 'Remove a comment from a blog' })
  @ApiParam({ name: 'blogId', type: String })
  @ApiParam({ name: 'commentIndex', type: Number })
  @ApiResponse({ status: 200, description: 'Comment removed successfully.' })
  @ApiResponse({ status: 404, description: 'Blog or comment not found.' })
  removeComment(@Param('blogId') blogId: string, @Param('commentIndex') commentIndex: string) {
    return this.blogService.removeComment(blogId, parseInt(commentIndex));
  }

  // Public - Remove comment from blog in specific language
  @Delete(':language/post/:blogId/comments/:commentIndex')
  @ApiOperation({ summary: 'Remove a comment from a blog in specific language' })
  @ApiParam({ name: 'language', type: String, description: 'Language code' })
  @ApiParam({ name: 'blogId', type: String })
  @ApiParam({ name: 'commentIndex', type: Number })
  @ApiResponse({ status: 200, description: 'Comment removed successfully.' })
  @ApiResponse({ status: 404, description: 'Blog or comment not found.' })
  removeCommentInLanguage(@Param('language') language: string, @Param('blogId') blogId: string, @Param('commentIndex') commentIndex: string) {
    return this.blogService.removeComment(blogId, parseInt(commentIndex), language);
  }

  // Public - Delete blog (default)
  @Delete('post/:id')
  @ApiOperation({ summary: 'Delete a blog by ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'Blog deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Blog not found.' })
  remove(@Param('id') id: string) {
    return this.blogService.remove(id);
  }

  // Public - Delete blog in specific language
  @Delete(':language/post/:id')
  @ApiOperation({ summary: 'Delete a blog by ID in specific language' })
  @ApiParam({ name: 'language', type: String, description: 'Language code' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'Blog deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Blog not found.' })
  removeInLanguage(@Param('language') language: string, @Param('id') id: string) {
    return this.blogService.remove(id, language);
  }
}
