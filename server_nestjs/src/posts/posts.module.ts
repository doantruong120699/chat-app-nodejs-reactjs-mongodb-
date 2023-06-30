import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from '~posts/entities/post.entity';
import { AlbumEntity } from '~posts/entities/album.entity';
import { PhotoEntity } from '~posts/entities/photo.entity';
import { PostRepository } from '~posts/repositories/post.repository';
import { AlbumRepository } from '~posts/repositories/album.repository';
import { PhotoRepository } from '~posts/repositories/photo.repository';
import { PostsController } from '~posts/controllers/posts.controller';
import { PostsService } from '~posts/services/posts.service';
import { ReactionEntity } from './entities/reaction.entity';
import { CommentEntity } from './entities/comment.entity';
import { ReactionService } from './services/reaction.service';
import { ReactionController } from './controllers/reaction.controller';
import { ReactionRepository } from './repositories/reaction.repository';
import { CommentRepository } from './repositories/comment.repository';
import { CommentController } from './controllers/comment.controller';
import { CommentService } from './services/comment.service';

@Module({
    controllers: [PostsController, ReactionController, CommentController],
    providers: [PostsService, ReactionService, CommentService],
    imports: [
        TypeOrmModule.forFeature([
            PostEntity,
            PostRepository,
            AlbumEntity,
            AlbumRepository,
            PhotoEntity,
            PhotoRepository,
            ReactionEntity,
            ReactionRepository,
            CommentEntity,
            CommentRepository
        ])
    ]
})
export class PostsModule {}
