import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { UserEntity } from '~users/entities/user.entity';
import { Password } from '../validators/password.validator';
import { Unique } from '~core/validators/unique.validator';

export class SignUpDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    @Unique(UserEntity, 'email')
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(40)
    @Password()
    password: string;

    @ApiProperty()
    @IsNotEmpty()
    @MaxLength(40)
    firstName: string;

    @ApiProperty()
    @IsNotEmpty()
    @MaxLength(40)
    lastName: string;

    @ApiProperty()
    birthday: Date;

    @ApiProperty()
    @MinLength(8)
    @MaxLength(12)
    phoneNumber: string;

    @ApiProperty()
    @MaxLength(255)
    address: string;

    @ApiProperty()
    gender: boolean;

    @ApiProperty()
    avatar: string;
}
