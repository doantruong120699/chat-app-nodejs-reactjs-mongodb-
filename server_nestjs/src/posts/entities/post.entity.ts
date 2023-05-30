import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { PostPrivacy, PostStatus } from '../constants/post.status';
import { UserEntity } from '~users/entities/user.entity';
import { BaseEntity } from '~core/entities/base.entity';
import { PhotoEntity } from './photo.entity';

@Entity('Post')
export class PostEntity extends BaseEntity {
    @ManyToOne((type) => UserEntity, (user) => user.posts)
    owner: UserEntity;

    @Column({
        type: 'text',
        nullable: true,
        collation: 'utf8'
    })
    caption: string;

    @Column({ default: 0 })
    likes: number;

    @Column({ default: 0 })
    comments: number;

    @Column({ default: 0 })
    share: number;

    @Column({ default: PostStatus.DRAFT, nullable: false })
    status: number;

    @Column({ default: PostPrivacy.FRIEND, nullable: false })
    privacy: number;

    @OneToMany((type) => PhotoEntity, (photo) => photo.post)
    photos: PhotoEntity[];
}
