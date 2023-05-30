import { Module } from '@nestjs/common';
import { UserModule } from '~users/user.module';
import { databaseConfig } from '~config/database.config';
import { CommandModule } from 'nestjs-command';
import { ConfigModule } from '@nestjs/config';
import { PostsModule } from './posts/posts.module';
import { JwtStrategy } from '~users/strategies/jwt.strategy';

const environment = process.env.NODE_ENV || 'development';
@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.env.${environment}`,
            isGlobal: true
        }),
        databaseConfig,
        CommandModule,
        UserModule,
        PostsModule
    ],
    controllers: [],

    providers: [JwtStrategy]
})
export class AppModule {}
