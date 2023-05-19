import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
// import { Cache } from 'cache-manager';
import { ExtractJwt } from 'passport-jwt';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor() {
        super();
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        if (!(await super.canActivate(context))) {
            return false;
        }
        // const token = ExtractJwt.fromAuthHeaderAsBearerToken()(context.switchToHttp().getRequest());

        return true;
        // return !(await this.cacheManager.get(token));
    }
}
