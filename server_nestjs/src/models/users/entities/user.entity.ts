import { Profile } from 'src/models/profiles/entities/profile.entity';
import { DatetimeEntity } from '../../common/entities/common.entity';
import { IUser } from '../interfaces/user.interface';
import { Entity, Column, OneToOne } from 'typeorm';

@Entity({ name: 'users' })
export class User extends DatetimeEntity implements IUser {
  @Column({ unique: true, length: 255 })
  email: string;

  @Column({ name: 'password', length: 255 })
  password: string;

  @Column({ name: 'first_name', length: 255 })
  first_name: string;

  @Column({ name: 'last_name', length: 255 })
  last_name: string;

  @OneToOne(() => Profile, (profile) => profile.user)
  profile: Profile;

  created_at: Date;
  updated_at: Date;
}
