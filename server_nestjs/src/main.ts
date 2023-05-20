import { env } from '~config/env.config';

env.ROOT_PATH = __dirname; // Should be on top

import { NestFactory } from '@nestjs/core';
import { AppModule } from '~app.module';
import { BadRequestException } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import path from 'path';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    app.enableCors({
        origin: function (requestOrigin, callback) {
            if (!requestOrigin) {
                return callback(null, true);
            }
            requestOrigin = requestOrigin.replace('https://', '').replace('http://', '');
            if (env.WHITELIST_DOMAINS.indexOf(requestOrigin) !== -1) {
                return callback(null, true);
            } else {
                return callback(new BadRequestException(`No CORS allowed. Origin: ${requestOrigin}`), false);
            }
        }
    });
    app.useStaticAssets(path.join(env.ROOT_PATH, 'static'));

    const config = new DocumentBuilder().setTitle('API docs').setVersion('1.0').build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
    await app.listen(env.APP_PORT);
}

bootstrap()
    .then(() => console.log('Init app success'))
    .catch(console.error);
