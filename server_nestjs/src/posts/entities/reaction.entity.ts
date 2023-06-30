import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseBigIntIdEntity } from '~core/entities/base.entity';
import { PostEntity } from './post.entity';
import { ReactionType } from '~posts/constants/reaction-type';
import { UserEntity } from '~users/entities/user.entity';

@Entity('Reaction')
export class ReactionEntity extends BaseBigIntIdEntity {
    @ManyToOne((type) => PostEntity, (post) => post.reactions)
    post: PostEntity;

    @ManyToOne((type) => UserEntity, (user) => user.reactions)
    user: UserEntity;

    @Column({ default: ReactionType.LIKE, nullable: false })
    reactionType: number;

    @Column({ default: false, nullable: false })
    isDeleted: boolean;
}
