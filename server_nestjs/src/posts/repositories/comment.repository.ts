import { EntityRepository, Repository } from 'typeorm';
import { CommentEntity } from '~posts/entities/comment.entity';

@EntityRepository(CommentEntity)
export class CommentRepository extends Repository<CommentEntity> {
    async executeRawQuery(sqlQuery: string, parameters?: any[]): Promise<any> {
        return this.query(sqlQuery, parameters);
    }
}
