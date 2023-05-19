import { GoneException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../repositories/user.repository';
import { OtpRepository } from '../repositories/otp.repository';
import bcrypt from 'bcrypt';
import { isExpire } from '~core/helpers/time.helper';
import { env } from '~config/env.config';
import { makeAToken } from '~core/helpers/string.helper';

@Injectable()
export class ResetPasswordService {
    public constructor(
        @InjectRepository(OtpRepository) private otpRepo: OtpRepository,
        @InjectRepository(UserRepository) private userRepo: UserRepository
    ) {}

    async checkToken(token: string) {
        let otp = await this.otpRepo.findOneOrFail({ token: token }, { relations: ['user'] });
        if (!otp.isValid || isExpire(otp.expireAt)) {
            throw new GoneException({ translate: 'error.token_is_invalid_or_expired' });
        }

        return otp;
    }

    async createNewToken() {
        const token = makeAToken();
        const otp = this.otpRepo.findOneOrFail({ token });

        if (!otp) {
            return await this.createNewToken();
        }

        return token;
    }

    async resetPassword(password: string, token: string) {
        let otp = await this.checkToken(token);
        otp.isValid = false;
        await this.otpRepo.save(otp);
        await this.userRepo.update(otp.user.id, { password: bcrypt.hashSync(password, env.SALT_ROUND) });
    }
}
