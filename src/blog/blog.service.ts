import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { Blog } from './entities/blog.schema';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { AddCommentDto } from './dto/add-comment.dto';

@Injectable()
export class BlogService {
  private languageCollectionMap = {
    // Language codes
    'en': '', // Default/English - no suffix needed
    'ta': 'Tamil',
    'hi': 'Hindi', 
    'bn': 'Bengali',
    'te': 'Telugu',
    'mr': 'Marathi',
    'gu': 'Gujarati',
    'kn': 'Kannada',
    'ml': 'Malayalam',
    // Language names (for URL friendliness)
    'english': '',
    'tamil': 'Tamil',
    'hindi': 'Hindi',
    'bengali': 'Bengali',
    'telugu': 'Telugu',
    'marathi': 'Marathi',
    'gujarati': 'Gujarati',
    'kannada': 'Kannada',
    'malayalam': 'Malayalam'
  };

  constructor(
    @InjectModel(Blog.name) private blogModel: Model<Blog>,
    @InjectConnection() private connection: Connection,
  ) {}

  private getCollectionName(language?: string): string {
    if (!language || language === 'en') {
      return 'blogs'; // Default collection
    }
    
    const suffix = this.languageCollectionMap[language];
    if (!suffix) {
      return 'blogs'; // Fallback to default if language not found
    }
    
    return `blogs${suffix}`;
  }

  private async getBlogModel(language?: string): Promise<Model<Blog>> {
    const collectionName = this.getCollectionName(language);
    
    if (collectionName === 'blogs') {
      return this.blogModel; // Use default model
    }
    
    // Create model for specific language collection
    try {
      return this.connection.model<Blog>(collectionName, this.blogModel.schema, collectionName);
    } catch (error) {
      // If model doesn't exist, create it
      return this.connection.model<Blog>(collectionName, this.blogModel.schema, collectionName);
    }
  }

  async create(createBlogDto: CreateBlogDto, language?: string): Promise<Blog> {
    const model = await this.getBlogModel(language);
    const newBlog = new model(createBlogDto);
    return newBlog.save();
  }

  async findAll(language?: string): Promise<Blog[]> {
    const model = await this.getBlogModel(language);
    return model.find().exec();
  }

  async findOne(id: string, language?: string): Promise<Blog> {
    const model = await this.getBlogModel(language);
    const blog = await model.findById(id).exec();
    if (!blog) {
      throw new NotFoundException(`Blog with ID ${id} not found`);
    }
    return blog;
  }

  async update(id: string, updateBlogDto: UpdateBlogDto, language?: string): Promise<Blog> {
    const model = await this.getBlogModel(language);
    const updatedBlog = await model
      .findByIdAndUpdate(id, updateBlogDto, { new: true })
      .exec();
    if (!updatedBlog) {
      throw new NotFoundException(`Blog with ID ${id} not found`);
    }
    return updatedBlog;
  }

  async remove(id: string, language?: string): Promise<Blog> {
    const model = await this.getBlogModel(language);
    const deletedBlog = await model.findByIdAndDelete(id).exec();
    if (!deletedBlog) {
      throw new NotFoundException(`Blog with ID ${id} not found`);
    }
    return deletedBlog;
  }

  // Add comment to a blog post
  async addComment(id: string, addCommentDto: AddCommentDto, language?: string): Promise<Blog> {
    const model = await this.getBlogModel(language);
    const blog = await model.findById(id).exec();
    if (!blog) {
      throw new NotFoundException(`Blog with ID ${id} not found`);
    }

    blog.comments.push(addCommentDto);
    return blog.save();
  }

  // Remove comment from a blog post
  async removeComment(blogId: string, commentIndex: number, language?: string): Promise<Blog> {
    const model = await this.getBlogModel(language);
    const blog = await model.findById(blogId).exec();
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
  async searchBlogs(query: string, language?: string): Promise<Blog[]> {
    const model = await this.getBlogModel(language);
    return model
      .find({
        $or: [
          { blogTitle: { $regex: new RegExp(query, 'i') } },
          { author: { $regex: new RegExp(query, 'i') } }
        ]
      })
      .exec();
  }

  // Get blogs by author
  async getBlogsByAuthor(author: string, language?: string): Promise<Blog[]> {
    const model = await this.getBlogModel(language);
    return model
      .find({ author: { $regex: new RegExp(author, 'i') } })
      .exec();
  }
}
