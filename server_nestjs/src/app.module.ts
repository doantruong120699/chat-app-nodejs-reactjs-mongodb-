import { Module } from '@nestjs/common';
import { AppController } from '~app.controller';
import { UserModule } from '~users/user.module';
import { databaseConfig } from '~config/database.config';
import { CommandModule } from 'nestjs-command';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from '~core/filters/http-exception.filter';
import { ConfigModule } from '@nestjs/config';

const environment = process.env.NODE_ENV || 'development';
@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.env.${environment}`,
            isGlobal: true
        }),
        databaseConfig,
        CommandModule,
        UserModule
    ],
    controllers: [AppController],
    providers: [
        {
            provide: APP_FILTER,
            useClass: HttpExceptionFilter
        }
    ]
})
export class AppModule {}
