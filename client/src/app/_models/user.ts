class BaseModel {
  createdAt?: Date;
  updatedAt?: Date;
}

export interface User extends BaseModel{
  id?: string;
  username?: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  is_active?: boolean;
  profile?: Profile;
}

export interface Profile extends BaseModel {
  id?: string;
  address?: string;
  birthday?: Date;
  gender?: boolean;
  phonenumber?: string;
  avatar?: string;
}
