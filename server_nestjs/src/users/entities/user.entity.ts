import { Column, Entity, Index, JoinColumn, OneToOne } from 'typeorm';
import { Exclude } from 'class-transformer';
import { BaseEntity } from '~core/entities/base.entity';
import { ProfileEntity } from './profile.entity';

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

    @OneToOne(() => ProfileEntity, (profile) => profile.user) // specify inverse side as a second parameter
    @JoinColumn()
    profile: ProfileEntity;
}
