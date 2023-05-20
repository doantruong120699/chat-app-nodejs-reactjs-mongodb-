import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('Profile')
export class ProfileEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true, length: 255 })
    firstName: string;

    @Column({ nullable: true, length: 255 })
    lastName: string;

    @Column({ nullable: true })
    birthday: Date;

    @Column({ nullable: true, length: 255 })
    phoneNumber: string;

    @Column({ nullable: true, length: 1000 })
    address: string;

    @Column({ nullable: true })
    gender: boolean;

    @Column({ nullable: true, length: 255 })
    avatar: string;

    @OneToOne(() => UserEntity, (user) => user.profile) // specify inverse side as a second parameter
    user: UserEntity;
}
