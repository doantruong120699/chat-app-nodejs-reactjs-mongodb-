import {
    CreateDateColumn,
    DeleteDateColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    BaseEntity as AbstractEntity
} from 'typeorm';

export abstract class BaseEntity extends AbstractEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @CreateDateColumn({
        type: 'timestamp'
    })
    createdAt: number;

    @UpdateDateColumn({
        type: 'timestamp'
    })
    updatedAt: number;

    @DeleteDateColumn({
        type: 'timestamp'
    })
    deletedAt: number;
}
