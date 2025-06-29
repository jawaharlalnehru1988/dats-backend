import { ApiProperty } from '@nestjs/swagger';

export class CreateBlogDto {
   @ApiProperty()
    value: string;

      @ApiProperty()
    heading: string;

      @ApiProperty()
    content: string;

      @ApiProperty()
    orderNo: number;
  }