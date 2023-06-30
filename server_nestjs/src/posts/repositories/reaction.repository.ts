import { EntityRepository, Repository } from 'typeorm';
import { ReactionEntity } from '~posts/entities/reaction.entity';

@EntityRepository(ReactionEntity)
export class ReactionRepository extends Repository<ReactionEntity> {}
