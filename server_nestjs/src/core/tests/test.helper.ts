import { Test, TestingModule, TestingModuleBuilder } from '@nestjs/testing';
import { INestApplication, Type } from '@nestjs/common';
import request, { CallbackHandler } from 'supertest';
import './suppertest.helper';
import { ValidateException } from '../exceptions/validate.exception';
import { BaseEntity } from 'typeorm';
import { ValidationPipe } from '../http/pipes/validation.pipe';
import { AppModule } from '~app.module';
import { databaseConfig } from '~config/database.config';

export class TestHelper {
    public app: INestApplication;
    public httpService: any;
    public moduleFixture: TestingModule;
    public nameRepo: any;
    private testHelperModules: { [_: string]: any } = {};

    async initialize<T>(
        repository: Type<T>,
        overrideBuilder?: (builder: TestingModuleBuilder) => TestingModuleBuilder
    ) {
        let moduleBuilder = Test.createTestingModule({
            imports: [AppModule, databaseConfig],
            providers: [repository]
        });
        if (overrideBuilder) {
            moduleBuilder = overrideBuilder(moduleBuilder);
        }
        this.moduleFixture = await moduleBuilder.compile();
        this.app = this.moduleFixture.createNestApplication();
        this.nameRepo = this.moduleFixture.get<T>(repository);
        this.app.useGlobalPipes(
            new ValidationPipe({
                whitelist: true,
                exceptionFactory: (errors) => new ValidateException(errors)
            })
        );

        await this.app.init();
        this.httpService = this.app.getHttpServer();
    }

    getTestHelperModule<T>(testHelperModule: new (t: TestHelper) => T): T {
        if (!this.testHelperModules[testHelperModule.name]) {
            this.testHelperModules[testHelperModule.name] = new testHelperModule(this);
        }
        return this.testHelperModules[testHelperModule.name];
    }

    async close() {
        await this.app.close();
        this.app = null;
        this.nameRepo = null;
    }

    getRepository() {
        return this.nameRepo;
    }

    getService<T>(service: Type<T>): Promise<T> {
        return this.moduleFixture.resolve(service);
    }

    get(url: string, callback?: CallbackHandler) {
        return request(this.httpService).get(url, callback);
    }

    post(url: string, callback?: CallbackHandler) {
        return request(this.httpService).post(url, callback);
    }

    put(url: string, callback?: CallbackHandler) {
        return request(this.httpService).put(url, callback);
    }

    patch(url: string, callback?: CallbackHandler) {
        return request(this.httpService).patch(url, callback);
    }

    delete(url: string, callback?: CallbackHandler) {
        return request(this.httpService).delete(url, callback);
    }

    async visibleInDatabase(entity: typeof BaseEntity, condition) {
        if (typeof condition === 'string') {
            condition = { id: condition };
        }
        if (!(await entity.getRepository().findOne(condition))) {
            throw new Error(`${JSON.stringify(condition)} invisible in database`);
        }
    }

    async invisibleInDatabase(entity: typeof BaseEntity, condition) {
        if (typeof condition === 'string') {
            condition = { id: condition };
        }
        if (await entity.getRepository().findOne(condition)) {
            throw new Error(`${JSON.stringify(condition)}  visible in database`);
        }
    }
}
