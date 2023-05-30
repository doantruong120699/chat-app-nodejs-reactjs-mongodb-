import { UserEntity } from '~users/entities/user.entity';

// export interface UserResponseResponse {
//     user: UserEntity;
//     token: string;
//     refreshToken: string;
//     expireAt: number;
// }

export interface LoginResponse {
    user: UserEntity;
    accessToken: string;
    refreshToken: string;
    expireAt: number;
}
