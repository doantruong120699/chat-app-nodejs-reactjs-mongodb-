import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class UpdateMyInfoDto {
    @ApiProperty()
    @IsNotEmpty()
    @MaxLength(40)
    firstName: string;

    @ApiProperty()
    @IsNotEmpty()
    @MaxLength(40)
    lastName: string;

    @ApiProperty()
    @IsNotEmpty()
    birthday: Date;

    @ApiProperty()
    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(12)
    phoneNumber: string;

    @ApiProperty()
    @MaxLength(255)
    @IsNotEmpty()
    address: string;

    @ApiProperty()
    @IsNotEmpty()
    gender: boolean;
}
