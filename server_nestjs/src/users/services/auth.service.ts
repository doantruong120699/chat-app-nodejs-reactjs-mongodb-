import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import moment from 'moment';
import { env } from '~config/env.config';
import { LoginResponse } from '~users/interfaces/login-response.interface';
import { SignUpDto } from '~users/dto/sign-up.dto';
import { ProfileRepository } from '~users/repositories/profile.repository';

@Injectable()
export class AuthService {
    public constructor(
        private userRepo: UserRepository,
        private profileRepo: ProfileRepository,
        private jwtService: JwtService
    ) {}

    async login(email: string, password: string) {
        let user = await this.userRepo.findOne({ email }, { select: ['id', 'password'] });
        if (!user || !user.password || !bcrypt.compareSync(password, user.password)) {
            throw new UnauthorizedException({ message: 'Invalid email or password' });
        }
        await this.updateLastLoginAt(user.id);
        return await this.loginDataResponse(user.id, email);
    }

    async loginDataResponse(userId: string, email: string): Promise<LoginResponse> {
        let token = await this.jwtService.signAsync({ id: userId, email: email });
        let user = await this.userRepo.findById(userId, { relations: ['profile'] });

        const accessToken = this.jwtService.sign(
            { id: userId, email: email },
            { secret: env.JWT.SECRET, expiresIn: env.JWT.EXPIRE }
        );
        const refreshToken = this.jwtService.sign(
            { id: userId, email: email },
            { secret: env.JWT.REFRESH_SECRET, expiresIn: env.JWT.REFRESH_EXPIRE }
        );

        return {
            user: user,
            accessToken: accessToken,
            refreshToken: refreshToken,
            expireAt: ((await this.jwtService.decode(token)) as any).exp
        };
    }

    async logout(token: string) {
        // Add refresh token to blacklist
        return true;
    }

    private async verifyRefreshToken(refreshToken: string) {
        const payload = (await this.jwtService.decode(refreshToken)) as any;
        try {
            this.jwtService.verify(refreshToken, { secret: env.JWT.REFRESH_SECRET });
            const blacklistTtl = payload.exp - moment().unix();
            return { payload, blacklistTtl };
        } catch (e) {
            throw new BadRequestException({ message: 'Token is invalid or expired' });
        }
    }

    async refreshToken(refreshToken: string) {
        const { payload } = await this.verifyRefreshToken(refreshToken);
        return this.loginDataResponse(payload.id, payload.email);
    }

    async updateLastLoginAt(id: string) {
        await this.userRepo.update(id, { lastLoginAt: moment.utc().format('YYYY-MM-DD HH:mm:ss') });
    }

    async signUp(signUpInfo: SignUpDto) {
        const hashedPassword = await bcrypt.hash(signUpInfo.password, env.SALT_ROUND);
        const profile = await this.profileRepo.save(signUpInfo);

        const user = await this.userRepo.save({
            email: signUpInfo.email,
            password: hashedPassword,
            profile: profile
        });

        return this.loginDataResponse(user.id, user.email);
    }
}
