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

@Module({
    controllers: [PostsController],
    providers: [PostsService],
    imports: [
        TypeOrmModule.forFeature([
            PostEntity,
            PostRepository,
            AlbumEntity,
            AlbumRepository,
            PhotoEntity,
            PhotoRepository
        ])
    ]
})
export class PostsModule {}
