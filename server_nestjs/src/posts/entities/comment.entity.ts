import { Column, Entity, ManyToOne } from 'typeorm';
import { UserEntity } from '~users/entities/user.entity';
import { BaseBigIntIdEntity } from '~core/entities/base.entity';
import { PostEntity } from './post.entity';

@Entity('Comment')
export class CommentEntity extends BaseBigIntIdEntity {
    @ManyToOne((type) => UserEntity, (user) => user.comments)
    user: UserEntity;

    @ManyToOne((type) => PostEntity, (post) => post.comments)
    post: PostEntity;

    @Column({
        type: 'text',
        nullable: true
        // collation: 'utf8'
    })
    content: string;

    @Column({ default: false })
    isEdited: boolean;

    @ManyToOne((type) => CommentEntity, (comment) => comment.parentComment)
    parentComment: CommentEntity;

    @Column({
        nullable: true
    })
    path: string;
}
