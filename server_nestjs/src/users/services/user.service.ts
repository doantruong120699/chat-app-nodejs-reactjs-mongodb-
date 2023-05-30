import { env } from '~config/env.config';

import { FindOneOptions } from 'typeorm/find-options/FindOneOptions';
import { BadRequestException, Global, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../repositories/user.repository';
import bcrypt from 'bcrypt';
import { UserEntity } from '~users/entities/user.entity';
import { FindManyOptions } from 'typeorm';
import { ProfileRepository } from '~users/repositories/profile.repository';
import { UpdateMyInfoDto } from '~users/dto/update-my-info.dto';
import * as fs from 'fs';

@Global()
@Injectable()
export class UserService {
    public constructor(
        @InjectRepository(UserRepository) private userRepo: UserRepository,
        @InjectRepository(ProfileRepository) private profileRepo: ProfileRepository
    ) {}

    find(options: FindManyOptions): Promise<UserEntity[]> {
        return this.userRepo.find(options);
    }

    findOne(options: FindOneOptions): Promise<UserEntity> {
        return this.userRepo.findOne(options);
    }

    public findUserById(id: string): Promise<UserEntity> {
        return this.userRepo.findById(id);
    }

    public findByIdNotFail(id: string, options: FindOneOptions): Promise<UserEntity> {
        return this.userRepo.findOne(id, options);
    }

    async changePassword(userId: string, newPassword: string, oldPassword: string): Promise<void> {
        const user = await this.userRepo.findOne({ id: userId }, { select: ['id', 'password'] });

        if (!bcrypt.compareSync(oldPassword, user.password)) {
            throw new BadRequestException({ message: 'Your old password is incorrect.' });
        }

        user.password = bcrypt.hashSync(newPassword, env.SALT_ROUND);
        await this.userRepo.update(user.id, user);
    }

    async uploadAvatar(user: UserEntity, avatar: Express.Multer.File) {
        // Remove old avatar
        if (user.profile.avatar) {
            const oldPath = process.cwd() + user.profile.avatar.replace(env.BACKEND_URL, '');
            if (fs.existsSync(oldPath)) {
                fs.unlink(oldPath, (err) => {});
            }
        }
        if (!avatar) {
            throw new BadRequestException({ message: 'Please upload an avatar.' });
        }
        await this.profileRepo.update(user.profile.id, {
            avatar: avatar.path
        });
        return {
            message: 'Avatar updated successfully!'
        };
    }

    async updateMyInfo(user: UserEntity, data: UpdateMyInfoDto): Promise<void> {
        await this.profileRepo.update(user.profile.id, data);
    }
}
