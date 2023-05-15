import { DatetimeEntity } from 'src/models/common/entities/common.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { Gender, IProfile } from '../interfaces/profile.interface';
import { User } from 'src/models/users/entities/user.entity';

@Entity({ name: 'profiles' })
export class Profile extends DatetimeEntity implements IProfile {
  created_at: Date;
  updated_at: Date;
  @Column({ name: 'user_id', nullable: true })
  user_id: number;

  @Column({ name: 'avatar', nullable: true })
  avatar: string;

  @Column({ name: 'address', nullable: true })
  address: string;

  @Column({ name: 'phonenumber', nullable: true })
  phonenumber: string;

  @Column({ name: 'description', nullable: true })
  description: string;

  @Column({ name: 'gender', nullable: true })
  gender: Gender;

  @Column({
    name: 'birthday',
    default: null,
    nullable: true,
  })
  birthday: Date;

  @OneToOne(() => User, (user) => user.profile)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;
}
