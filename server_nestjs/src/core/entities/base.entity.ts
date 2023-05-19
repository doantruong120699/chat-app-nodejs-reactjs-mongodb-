import {
    CreateDateColumn,
    DeleteDateColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    BaseEntity as AbstractEntity
} from 'typeorm';
import { TimestampTransformer } from '../transformers/timestamp.transformer';

export abstract class BaseEntity extends AbstractEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @CreateDateColumn({ type: 'timestamp', transformer: new TimestampTransformer() })
    createdAt: number;

    @UpdateDateColumn({
        type: 'timestamp',
        transformer: new TimestampTransformer()
    })
    updatedAt: number;

    @DeleteDateColumn({
        type: 'timestamp',
        transformer: new TimestampTransformer()
    })
    deletedAt: number;
}
