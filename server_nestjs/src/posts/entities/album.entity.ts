import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { PostPrivacy, PostStatus } from '../constants/post.status';
import { UserEntity } from '~users/entities/user.entity';
import { BaseEntity } from '~core/entities/base.entity';
import { PhotoEntity } from './photo.entity';

@Entity('Album')
export class AlbumEntity extends BaseEntity {
    @ManyToOne((type) => UserEntity, (user) => user.posts)
    owner: UserEntity;

    @Column('text')
    name: string;

    @Column({ default: PostStatus.DRAFT, nullable: false })
    status: number;

    @Column({ default: PostPrivacy.FRIEND, nullable: false })
    privacy: number;

    @OneToMany((type) => PhotoEntity, (photo) => photo.album)
    photos: PhotoEntity[];
}
