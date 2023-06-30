import { Injectable } from '@nestjs/common';
import { CreatePostDto } from '~posts/dto/create-post.dto';
import { UpdatePostDto } from '~posts/dto/update-post.dto';
import sharp from 'sharp';
import { PostRepository } from '~posts/repositories/post.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '~users/entities/user.entity';
import { PhotoRepository } from '~posts/repositories/photo.repository';
import { PostEntity } from '~posts/entities/post.entity';
import { env } from '~config/env.config';

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

    async findAll(user: UserEntity) {
        const sql = `SELECT 
                        Post.*,
                        JSON_OBJECT(
                            'id', User.id,
                            'profile', JSON_OBJECT(
                                'firstName', Profile.firstName,
                                'lastName', Profile.lastName,
                                'avatar', CONCAT('${env.BACKEND_URL}/', Profile.avatar),
                                'gender', Profile.gender
                            ) 
                        ) as owner,
                        JSON_ARRAYAGG(
                            JSON_OBJECT(
                                'id', Photo.id,
                                'url', CONCAT('${env.BACKEND_URL}/', Photo.url),
                                'caption', Photo.caption,
                                'height', Photo.height,
                                'width', Photo.width,
                                'likeCounter', Photo.likeCounter,
                                'commentCounter', Photo.commentCounter,
                                'shareCounter', Photo.shareCounter,
                                'createdAt', Photo.createdAt,
                                'updatedAt', Photo.updatedAt
                            )
                        ) AS photos,
                        Reaction.reactionType as reatedByUser ,
                        JSON_ARRAYAGG(
                            JSON_OBJECT(
                                'id', Comment.id,
                                'content', Comment.content,
                                'isEdited', Comment.isEdited,
                                'path', Comment.path
                            )
                        ) AS comments
                    FROM
                        Post
                    LEFT JOIN
                        Reaction ON Reaction.postId = Post.id AND Reaction.userId = '${user.id}' AND Reaction.isDeleted=false 
                    JOIN
                        User ON Post.ownerId = User.id
                    JOIN 
                        Profile ON User.profileId = Profile.id
                    LEFT JOIN 
                        Photo ON Post.id = Photo.postId
                    LEFT JOIN 
                        Comment ON Post.id = Comment.postId AND Comment.path IS NULL
                    GROUP BY Post.id, Reaction.id
                    ORDER BY Post.createdAt DESC`;

        console.log(sql);
        const data = await this.postRepo.executeRawQuery(sql);
        console.log(data);
        return data;
    }

    findOne(id: string) {
        return this.postRepo.findOneOrFail({ id });
    }

    update(id: number, updatePostDto: UpdatePostDto) {
        return `This action updates a #${id} post`;
    }

    increaseLikeCounter(post: PostEntity) {
        post.likeCounter += 1;
        return this.postRepo.save(post);
    }

    decreaseLikeCounter(post: PostEntity) {
        post.likeCounter -= 1;
        return this.postRepo.save(post);
    }

    remove(id: number) {
        return `This action removes a #${id} post`;
    }
}
