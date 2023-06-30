import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { PostPrivacy, PostStatus } from '../constants/post.status';
import { UserEntity } from '~users/entities/user.entity';
import { BaseEntity } from '~core/entities/base.entity';
import { PhotoEntity } from './photo.entity';
import { ReactionEntity } from './reaction.entity';
import { CommentEntity } from './comment.entity';

@Entity('Post')
export class PostEntity extends BaseEntity {
    @ManyToOne((type) => UserEntity, (user) => user.posts)
    owner: UserEntity;

    @Column({
        type: 'text',
        nullable: true
        // collation: 'utf8mb4'
    })
    caption: string;

    @Column({ default: 0 })
    likeCounter: number;

    @Column({ default: 0 })
    commentCounter: number;

    @Column({ default: 0 })
    shareCounter: number;

    @Column({ default: PostStatus.DRAFT, nullable: false })
    status: number;

    @Column({ default: PostPrivacy.FRIEND, nullable: false })
    privacy: number;

    @OneToMany((type) => PhotoEntity, (photo) => photo.post)
    photos: PhotoEntity[];

    @OneToMany((type) => ReactionEntity, (reaction) => reaction.post)
    reactions: ReactionEntity[];

    @OneToMany((type) => CommentEntity, (comment) => comment.post)
    comments: CommentEntity[];
}
