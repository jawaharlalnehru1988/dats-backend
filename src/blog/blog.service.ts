import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Blog } from './entities/blog.schema';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { AddCommentDto } from './dto/add-comment.dto';

@Injectable()
export class BlogService {
  constructor(@InjectModel(Blog.name) private blogModel: Model<Blog>) {}

  async create(createBlogDto: CreateBlogDto): Promise<Blog> {
    const newBlog = new this.blogModel(createBlogDto);
    return newBlog.save();
  }

  async findAll(): Promise<Blog[]> {
    return this.blogModel.find().exec();
  }

  async findOne(id: string): Promise<Blog> {
    const blog = await this.blogModel.findById(id).exec();
    if (!blog) {
      throw new NotFoundException(`Blog with ID ${id} not found`);
    }
    return blog;
  }

  async update(id: string, updateBlogDto: UpdateBlogDto): Promise<Blog> {
    const updatedBlog = await this.blogModel
      .findByIdAndUpdate(id, updateBlogDto, { new: true })
      .exec();
    if (!updatedBlog) {
      throw new NotFoundException(`Blog with ID ${id} not found`);
    }
    return updatedBlog;
  }

  async remove(id: string): Promise<Blog> {
    const deletedBlog = await this.blogModel.findByIdAndDelete(id).exec();
    if (!deletedBlog) {
      throw new NotFoundException(`Blog with ID ${id} not found`);
    }
    return deletedBlog;
  }

  // Add comment to a blog post
  async addComment(id: string, addCommentDto: AddCommentDto): Promise<Blog> {
    const blog = await this.blogModel.findById(id).exec();
    if (!blog) {
      throw new NotFoundException(`Blog with ID ${id} not found`);
    }

    blog.comments.push(addCommentDto);
    return blog.save();
  }

  // Remove comment from a blog post
  async removeComment(blogId: string, commentIndex: number): Promise<Blog> {
    const blog = await this.blogModel.findById(blogId).exec();
    if (!blog) {
      throw new NotFoundException(`Blog with ID ${blogId} not found`);
    }

    if (commentIndex < 0 || commentIndex >= blog.comments.length) {
      throw new NotFoundException(`Comment at index ${commentIndex} not found`);
    }

    blog.comments.splice(commentIndex, 1);
    return blog.save();
  }

  // Search blogs by title or author
  async searchBlogs(query: string): Promise<Blog[]> {
    return this.blogModel
      .find({
        $or: [
          { blogTitle: { $regex: new RegExp(query, 'i') } },
          { author: { $regex: new RegExp(query, 'i') } }
        ]
      })
      .exec();
  }

  // Get blogs by author
  async getBlogsByAuthor(author: string): Promise<Blog[]> {
    return this.blogModel
      .find({ author: { $regex: new RegExp(author, 'i') } })
      .exec();
  }
}
