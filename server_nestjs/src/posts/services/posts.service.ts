import { Injectable } from '@nestjs/common';
import { CreatePostDto } from '~posts/dto/create-post.dto';
import { UpdatePostDto } from '~posts/dto/update-post.dto';
import sharp from 'sharp';
import { PostRepository } from '~posts/repositories/post.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '~users/entities/user.entity';
import { PhotoRepository } from '~posts/repositories/photo.repository';

@Injectable()
export class PostsService {
    public constructor(
        @InjectRepository(PostRepository) private postRepo: PostRepository,
        @InjectRepository(PhotoRepository) private photoRepo: PhotoRepository
    ) {}

    async create(user: UserEntity, data: CreatePostDto, photos: Express.Multer.File[]) {
        let post = await this.postRepo.save({
            caption: data.caption,
            owner: user
        });

        for (const file of photos) {
            const image = sharp(file.path);
            const metadata = await image.metadata();
            const dimensions = {
                width: metadata.width,
                height: metadata.height
            };
            await this.photoRepo.save({
                caption: '',
                width: dimensions.width,
                height: dimensions.height,
                url: file.path,
                post: post
            });
        }
        return 'This action adds a new post';
    }

    async findAll() {
        const posts = this.postRepo.find({
            relations: ['photos', 'owner', 'owner.profile'],
            // select: ['photos.id'],
            order: { createdAt: 'DESC' }
        });

        // const posts = await this.postRepo
        //     .createQueryBuilder('post')
        //     .leftJoin('post.photos', 'photo', 'post.owner')
        //     .addSelect(['photo.url', 'post.owner.email'])
        //     .getMany();
        // console.log(posts);
        return posts;
    }

    findOne(id: number) {
        return `This action returns a #${id} post`;
    }

    update(id: number, updatePostDto: UpdatePostDto) {
        return `This action updates a #${id} post`;
    }

    remove(id: number) {
        return `This action removes a #${id} post`;
    }
}
