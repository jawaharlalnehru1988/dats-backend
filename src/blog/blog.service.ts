import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Blog } from './entities/blog.schema';

@Injectable()
export class BlogService {
  constructor(@InjectModel(Blog.name) private blogModel: Model<Blog>) {}

  async create(blogData: Partial<Blog>): Promise<Blog> {
    const newBlog = new this.blogModel(blogData);
    return newBlog.save();
  }

  async findAll(): Promise<Blog[]> {
    return this.blogModel.find().exec();
  }

  async findOne(id: string): Promise<Blog> {
    const blog = await this.blogModel.findById(id).exec();
    if (!blog) {
      throw new Error(`Blog with id ${id} not found`);
    }
    return blog;
  }

  async update(id: string, blogData: Partial<Blog>): Promise<Blog> {
    const updatedBlog = await this.blogModel.findByIdAndUpdate(id, blogData, { new: true }).exec();
    if (!updatedBlog) {
      throw new Error(`Blog with id ${id} not found`);
    }
    return updatedBlog;
  }

  async remove(id: string): Promise<Blog> {
    const deletedBlog = await this.blogModel.findByIdAndDelete(id).exec();
    if (!deletedBlog) {
      throw new Error(`Blog with id ${id} not found`);
    }
    return deletedBlog;
  }
}