export interface ProfileFormInterface {
  firstName: string;
  lastName: string;
  gender: number;
  phoneNumber: string;
  address: string;
  birthday: string;
}

export interface PasswordFormInterface {
  old_password: string;
  new_password: string;
  confirm_password: string;
}

export interface UploadAvatarInput {
  avatar: File;
}
