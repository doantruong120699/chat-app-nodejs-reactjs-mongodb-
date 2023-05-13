export interface ProfileFormInterface {
  first_name: string;
  last_name: string;
  email: string;
  gender: number;
  phonenumber: string;
  address: string;
  birthday: string;
  avatarSource: any;
  avatar: any;
}

export interface PasswordFormInterface {
  old_password: string;
  new_password: string;
  confirm_password: string;
}
