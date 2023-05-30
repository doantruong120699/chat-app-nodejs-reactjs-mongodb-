import { Body, Controller, Delete, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { LoginDto } from '../dto/login.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { ExtractJwt } from 'passport-jwt';
import { BaseController } from '~core/controllers/base.controller';
import { AuthService } from '~users/services/auth.service';
import { SignUpDto } from '../dto/sign-up.dto';
import { RefreshTokenAuthGuard } from '../guards/refresh-token-auth.guard';
import { RefreshTokenDto } from '../dto/refresh-token.dto';

@Controller('api/auth')
@ApiTags('Authentication')
export class AuthController extends BaseController {
    constructor(private authService: AuthService) {
        super();
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    async login(@Body() request: LoginDto) {
        return await this.authService.login(request.email, request.password);
    }

    @Post('sign-up')
    @HttpCode(HttpStatus.OK)
    async signUp(@Body() body: SignUpDto) {
        return await this.authService.signUp(body);
    }

    @Delete('logout')
    @ApiBearerAuth()
    @HttpCode(HttpStatus.NO_CONTENT)
    @UseGuards(JwtAuthGuard)
    async logout(@Request() request) {
        const token = ExtractJwt.fromAuthHeaderAsBearerToken()(request);
        return await this.authService.logout(token);
    }

    @Post('refresh-token')
    @UseGuards(RefreshTokenAuthGuard)
    refreshToken(@Body() dto: RefreshTokenDto) {
        return this.authService.refreshToken(dto.refreshToken);
    }
}
