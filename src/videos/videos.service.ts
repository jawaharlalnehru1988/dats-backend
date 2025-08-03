import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { AddCommentDto } from './dto/add-comment.dto';
import { Video } from './entities/video.entity';

@Injectable()
export class VideosService {
  constructor(
    @InjectModel(Video.name)
    private readonly videoModel: Model<Video>,
  ) {}

  async create(createVideoDto: CreateVideoDto): Promise<Video> {
    const newVideo = new this.videoModel(createVideoDto);
    return newVideo.save();
  }

  async findAll(): Promise<Video[]> {
    return this.videoModel.find().exec();
  }

  async findOne(id: string): Promise<Video> {
    const video = await this.videoModel.findById(id).exec();
    if (!video) {
      throw new NotFoundException(`Video with ID ${id} not found`);
    }
    return video;
  }

  async update(id: string, updateVideoDto: UpdateVideoDto): Promise<Video> {
    const updatedVideo = await this.videoModel
      .findByIdAndUpdate(id, updateVideoDto, { new: true })
      .exec();
    
    if (!updatedVideo) {
      throw new NotFoundException(`Video with ID ${id} not found`);
    }
    
    return updatedVideo;
  }

  async remove(id: string): Promise<Video> {
    const deletedVideo = await this.videoModel
      .findByIdAndDelete(id)
      .exec();
    
    if (!deletedVideo) {
      throw new NotFoundException(`Video with ID ${id} not found`);
    }
    
    return deletedVideo;
  }

  // Comment-specific methods
  async addComment(id: string, addCommentDto: AddCommentDto): Promise<Video> {
    const video = await this.videoModel.findById(id).exec();
    if (!video) {
      throw new NotFoundException(`Video with ID ${id} not found`);
    }

    video.comments.push({
      comment: addCommentDto.comment,
      userName: addCommentDto.userName,
      createdAt: new Date(),
    } as any);

    return video.save();
  }

  async removeComment(videoId: string, commentIndex: number): Promise<Video> {
    const video = await this.videoModel.findById(videoId).exec();
    if (!video) {
      throw new NotFoundException(`Video with ID ${videoId} not found`);
    }

    if (commentIndex < 0 || commentIndex >= video.comments.length) {
      throw new NotFoundException(`Comment at index ${commentIndex} not found`);
    }

    video.comments.splice(commentIndex, 1);
    return video.save();
  }

  // Search methods
  async findByTitle(title: string): Promise<Video[]> {
    return this.videoModel
      .find({ title: { $regex: new RegExp(title, 'i') } })
      .exec();
  }

  async findByDescription(description: string): Promise<Video[]> {
    return this.videoModel
      .find({ description: { $regex: new RegExp(description, 'i') } })
      .exec();
  }
}
