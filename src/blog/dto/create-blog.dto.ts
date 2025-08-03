import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray, ValidateNested, IsNotEmpty, IsUrl } from 'class-validator';
import { Type } from 'class-transformer';

export class CommentDto {
  @ApiProperty({ description: 'Name of the user making the comment' })
  @IsString()
  @IsNotEmpty()
  userName: string;

  @ApiProperty({ description: 'The comment content' })
  @IsString()
  @IsNotEmpty()
  comment: string;
}

export class CreateBlogDto {
  @ApiProperty({ description: 'Title of the blog post' })
  @IsString()
  @IsNotEmpty()
  blogTitle: string;

  @ApiProperty({ description: 'URL of the blog image' })
  @IsString()
  @IsUrl()
  @IsNotEmpty()
  blogImgUrl: string;

  @ApiProperty({ description: 'Content of the blog post' })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({ description: 'Author of the blog post' })
  @IsString()
  @IsNotEmpty()
  author: string;

  @ApiProperty({ 
    description: 'Comments on the blog post',
    type: [CommentDto],
    required: false 
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CommentDto)
  comments?: CommentDto[];
}
