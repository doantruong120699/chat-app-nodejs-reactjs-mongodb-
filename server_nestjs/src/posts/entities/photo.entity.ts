import { Column, Entity, ManyToOne } from 'typeorm';
import { PostPrivacy, PostStatus } from '../constants/post.status';
import { UserEntity } from '~users/entities/user.entity';
import { BaseEntity } from '~core/entities/base.entity';
import { AlbumEntity } from './album.entity';
import { ImageTransformer } from '~core/transformers/images.transformer';
import { PostEntity } from './post.entity';

@Entity('Photo')
export class PhotoEntity extends BaseEntity {
    @ManyToOne((type) => UserEntity, (user) => user.photos)
    owner: UserEntity;

    @ManyToOne((type) => AlbumEntity, (album) => album.photos)
    album: AlbumEntity;

    @ManyToOne((type) => PostEntity, (post) => post.photos)
    post: PostEntity;

    @Column({ type: 'text', nullable: true, collation: 'utf8mb4_unicode_ci' })
    caption: string;

    @Column({ nullable: true, length: 255, transformer: new ImageTransformer() })
    url: string;

    @Column({ default: 0 })
    likeCounter: number;

    @Column({ default: 0 })
    height: number;

    @Column({ default: 0 })
    width: number;

    @Column({ default: 0 })
    commentCounter: number;

    @Column({ default: 0 })
    shareCounter: number;

    @Column({ default: PostStatus.DRAFT, nullable: false })
    status: number;

    @Column({ default: PostPrivacy.FRIEND, nullable: false })
    privacy: number;
}
