class BaseModel {
  createdAt?: Date;
  updatedAt?: Date;
}

export interface User extends BaseModel {
  id?: string;
  username?: string;
  email?: string;
  profile?: Profile;
}

export interface Profile extends BaseModel {
  id?: string;
  firstName?: string;
  lastName?: string;
  address?: string;
  birthday?: Date;
  gender?: boolean;
  phoneNumber?: string;
  avatar?: string;
}
