import { Column, Entity, Index, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { Exclude } from 'class-transformer';
import { BaseEntity } from '~core/entities/base.entity';
import { ProfileEntity } from './profile.entity';
import { PostEntity } from '~posts/entities/post.entity';
import { AlbumEntity } from '~posts/entities/album.entity';
import { PhotoEntity } from '~posts/entities/photo.entity';
import { ReactionEntity } from '~posts/entities/reaction.entity';
import { CommentEntity } from '~posts/entities/comment.entity';

@Entity('User')
export class UserEntity extends BaseEntity {
    @Index()
    @Column({})
    email: string;

    @Exclude()
    @Column({ select: false, nullable: true })
    password: string;

    @Exclude()
    @Column({ nullable: true })
    public refreshToken: string;

    @Column({
        type: 'timestamp',
        nullable: true
    })
    lastLoginAt: Date;

    @OneToOne((type) => ProfileEntity, (profile) => profile.user)
    @JoinColumn()
    profile: ProfileEntity;

    @OneToMany((type) => PostEntity, (post) => post.owner)
    posts: PostEntity[];

    @OneToMany((type) => AlbumEntity, (album) => album.owner)
    albums: AlbumEntity[];

    @OneToMany((type) => PhotoEntity, (photo) => photo.owner)
    photos: PhotoEntity[];

    @OneToMany(() => ReactionEntity, (reaction) => reaction.user)
    reactions: ReactionEntity[];

    @OneToMany(() => CommentEntity, (comment) => comment.user)
    comments: CommentEntity[];
}
