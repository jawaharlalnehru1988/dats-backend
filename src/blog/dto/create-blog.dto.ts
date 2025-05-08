export class CreateBlogDto {
    title: string;
    content: string;
    author: string;
    isPublished?: boolean; // Optional, as it has a default value in the schema
  }