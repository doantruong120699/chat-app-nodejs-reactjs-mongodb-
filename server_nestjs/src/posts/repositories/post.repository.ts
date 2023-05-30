import { EntityRepository, Repository } from 'typeorm';
import { PostEntity } from '~posts/entities/post.entity';

@EntityRepository(PostEntity)
export class PostRepository extends Repository<PostEntity> {}
