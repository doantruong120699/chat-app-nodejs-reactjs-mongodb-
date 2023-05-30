import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './repositories/user.repository';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { env } from '~config/env.config';
// import { JwtStrategy } from './strategies/jwt.strategy';
import { UserEntity } from './entities/user.entity';
import { ResetPasswordController } from './controllers/reset-password.controller';
import { ResetPasswordService } from './services/reset-password.service';
import { ProfileEntity } from './entities/profile.entity';
import { ProfileRepository } from './repositories/profile.repository';
@Module({
    providers: [UserService, AuthService, ResetPasswordService],
    controllers: [AuthController, ResetPasswordController, UserController],
    exports: [UserService],
    imports: [
        TypeOrmModule.forFeature([UserRepository, UserEntity, ProfileEntity, ProfileRepository]),
        JwtModule.register({
            secret: env.JWT.SECRET,
            signOptions: {
                expiresIn: env.JWT.EXPIRE,
                algorithm: 'HS512'
            }
        })
    ]
})
export class UserModule {}
