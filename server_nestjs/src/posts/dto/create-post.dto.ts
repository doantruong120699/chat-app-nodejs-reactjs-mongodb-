import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreatePostDto {
    @ApiProperty()
    @IsString()
    caption: string;

    @ApiProperty({
        description: 'Array of photo',
        type: 'array',
        items: {
            type: 'string',
            format: 'binary'
        }
    })
    @IsNotEmpty()
    @IsArray()
    @IsString({ each: true })
    photos: string[];
}
