import { IDateTime } from 'src/models/common/interfaces/common.interface';

export interface IProfile extends IDateTime {
  user_id: number | null;
  avatar: string | null;
  address: string | null;
  gender: Gender;
  birthday: null | string | Date;
  phonenumber: string | null;
  description: string | null;
}

export enum Gender {
  male = 'male',
  female = 'female',
  other = 'other',
}
