import { Injectable } from '@nestjs/common';
import { UpdatePostDto } from '~posts/dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from '~posts/entities/post.entity';
import { ReactionDto } from '~posts/dto/reaction.dto';
import { PostsService } from './posts.service';
import { ReactionRepository } from '~posts/repositories/reaction.repository';
import { UserEntity } from '~users/entities/user.entity';

@Injectable()
export class ReactionService {
    public constructor(
        @InjectRepository(ReactionRepository) private reactionRepo: ReactionRepository,
        private readonly postService: PostsService
    ) {}

    async create(postId: string, data: ReactionDto, user: UserEntity) {
        let post = await this.postService.findOne(postId);
        let result = await this.createOrUpdate(post, user, data);

        if (result.isUpdateStatus) {
            if (!data.isDeleted) {
                this.postService.increaseLikeCounter(post);
            } else if (data.isDeleted && !result.created) {
                this.postService.decreaseLikeCounter(post);
            }
        }

        return result;
    }

    async createOrUpdate(post: PostEntity, user: UserEntity, data: ReactionDto) {
        let instance = await this.reactionRepo.findOne({ where: { post: post, user: user } });
        if (instance) {
            const isUpdateStatus = instance.isDeleted != data.isDeleted;
            instance.isDeleted = data.isDeleted;
            if (data.reactionType) {
                instance.reactionType = data.reactionType;
            }

            let updatedInstance = await this.reactionRepo.save(instance);
            return { instance: updatedInstance, created: false, isUpdateStatus: isUpdateStatus };
        }
        let newInstance = await this.reactionRepo.save({ post: post, user: user, reactionType: data.reactionType });
        return { instance: newInstance, created: true, isUpdateStatus: true };
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
