import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsNumberString } from 'class-validator';

export class FindOneParams {
    @IsNumberString()
    id: number;
}

export class ReactionDto {
    @ApiProperty()
    @IsNumber()
    reactionType: number;

    @ApiProperty()
    @IsBoolean()
    isDeleted: boolean;
}
