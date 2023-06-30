import { Injectable } from '@nestjs/common';
import { UpdatePostDto } from '~posts/dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from '~posts/entities/post.entity';
import { ReactionDto } from '~posts/dto/reaction.dto';
import { PostsService } from './posts.service';
import { UserEntity } from '~users/entities/user.entity';
import { CommentDto } from '~posts/dto/comment.dto';
import { env } from 'process';
import { CommentRepository } from '~posts/repositories/comment.repository';

@Injectable()
export class CommentService {
    public constructor(
        @InjectRepository(CommentRepository) private commentRepo: CommentRepository,
        private readonly postService: PostsService
    ) {}

    async create(postId: string, data: CommentDto, user: UserEntity) {
        // let post = await this.postService.findOne(postId);
        // let result = await this.createOrUpdate(post, user, data);
        // if (result.isUpdateStatus) {
        //     if (!data.isDeleted) {
        //         this.postService.increaseLikeCounter(post);
        //     } else if (data.isDeleted && !result.created) {
        //         this.postService.decreaseLikeCounter(post);
        //     }
        // }
        // return result;
    }

    async createOrUpdate(post: PostEntity, user: UserEntity, data: ReactionDto) {
        // let instance = await this.commentRepo.findOne({ where: { post: post, user: user } });
        // if (instance) {
        //     const isUpdateStatus = instance.isDeleted != data.isDeleted;
        //     instance.isDeleted = data.isDeleted;
        //     if (data.reactionType) {
        //         instance.reactionType = data.reactionType;
        //     }
        //     let updatedInstance = await this.commentRepo.save(instance);
        //     return { instance: updatedInstance, created: false, isUpdateStatus: isUpdateStatus };
        // }
        // let newInstance = await this.commentRepo.save({ post: post, user: user, reactionType: data.reactionType });
        // return { instance: newInstance, created: true, isUpdateStatus: true };
    }

    async getCommentByPost(postId: string, user: UserEntity) {
        const sql = `SELECT 
                        Comment.*,
                        User.id AS userId,
                        CONCAT('${env.BACKEND_URL}/', Profile.avatar) AS avatar,
                        CONCAT(Profile.firstName, " ", Profile.lastName) AS fullName,
                        COUNT(child.ID) AS ChildCount
                    FROM
                        Comment
                    JOIN User ON Comment.UserId = User.id
                    JOIN Profile ON User.profileId = Profile.id
                    LEFT JOIN Comment AS child ON child.parentCommentId = Comment.id
                    WHERE
                        Comment.postId = '${postId}' AND Comment.path IS NULL
                    GROUP BY Comment.id
                    ORDER BY Comment.createdAt DESC`;

        const data = await this.commentRepo.executeRawQuery(sql);
        console.log(data);
        return data;
    }

    async getChildComment(postId: string, user: UserEntity) {
        const sql = `SELECT 
                        Comment.*,
                        User.id AS userId,
                        CONCAT('${env.BACKEND_URL}/', Profile.avatar) AS avatar,
                        CONCAT(Profile.firstName, " ", Profile.lastName) AS fullName,
                        COUNT(child.ID) AS ChildCount
                    FROM
                        Comment
                    JOIN User ON Comment.UserId = User.id
                    JOIN Profile ON User.profileId = Profile.id
                    LEFT JOIN Comment AS child ON child.parentCommentId = Comment.id
                    WHERE
                        Comment.postId = '${postId}' AND Comment.path IS NULL
                    GROUP BY Comment.id
                    ORDER BY Comment.createdAt DESC`;

        const data = await this.commentRepo.executeRawQuery(sql);
        console.log(data);
        return data;
    }

    async findAll() {}

    // findOne(id: number) {
    //     return `This action returns a #${id} post`;
    // }

    update(id: number, updatePostDto: UpdatePostDto) {
        return `This action updates a #${id} post`;
    }

    remove(id: number) {
        return `This action removes a #${id} post`;
    }
}
