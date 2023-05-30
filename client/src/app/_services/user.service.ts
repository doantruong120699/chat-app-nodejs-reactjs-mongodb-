import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { toFormData } from '../utils';
import {
  ProfileFormInterface,
  UploadAvatarInput,
} from '@app/pages/auth/profile/profile.interface';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) {}

  me() {
    return this.http.get(`${environment.apiUrl}/users/me`);
  }

  uploadAvatar(data: UploadAvatarInput) {
    return this.http.put(
      `${environment.apiUrl}/users/upload-avatar`,
      toFormData(data),
      {
        headers: {
          SendFile: 'true',
        },
      }
    );
  }

  updateMyInfo(data: ProfileFormInterface) {
    return this.http.put(`${environment.apiUrl}/users/update-info`, data);
  }
}
