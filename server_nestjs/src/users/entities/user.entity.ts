import { Column, Entity, Index } from 'typeorm';
import { Exclude } from 'class-transformer';
import { BaseEntity } from '~core/entities/base.entity';
import { LowerTransformer } from '~core/transformers/lower.transformer';
import { TimestampTransformer } from '~core/transformers/timestamp.transformer';

@Entity('User')
export class UserEntity extends BaseEntity {
    @Index()
    @Column({ transformer: new LowerTransformer() })
    email: string;

    @Exclude()
    @Column({ select: false, nullable: true })
    password: string;

    @Exclude()
    @Column({ nullable: true })
    public refreshToken: string;

    @Column({
        type: 'timestamp',
        nullable: true,
        transformer: new TimestampTransformer()
    })
    lastLoginAt: Date;
}
