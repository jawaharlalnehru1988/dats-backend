import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class AddCommentDto {
    @ApiProperty({ description: 'Name of the user making the comment', required: false })
    @IsString()
    @IsOptional()
    userName?: string;

    @ApiProperty({ description: 'The comment content', required: false })
    @IsString()
    @IsOptional()
    comment?: string;
}
