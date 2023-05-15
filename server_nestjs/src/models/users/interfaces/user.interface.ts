import { IDateTime } from '../../common/interfaces/common.interface';

export interface IUser extends IDateTime {
  email: string;
  password: string;
  first_name: null | string;
  last_name: null | string;
}
