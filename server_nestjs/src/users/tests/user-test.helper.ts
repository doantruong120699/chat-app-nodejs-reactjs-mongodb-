import faker from 'faker';
import { TestHelper } from '~core/tests/test.helper';
import { DEFAULT_PASSWORD } from '~users/constants/default-password.constant';
import { UserEntity } from '~users/entities/user.entity';
import { UserRepository } from '~users/repositories/user.repository';

export class UserTestHelper {
    constructor(private testHelper: TestHelper) {}
    async createUser(options: Partial<UserEntity> = {}): Promise<UserEntity> {
        const dataInput = {
            email: faker.internet.email(),
            ...options,
            password: options.password || DEFAULT_PASSWORD
        };

        const { body } = await this.testHelper.post('/auth/sign-up').send(dataInput).isOk();

        return body.user;
    }

    async getUser(condition: any = {}) {
        const userRepo: UserRepository = this.testHelper.getRepository();
        let user = await userRepo.findOne(condition);
        if (!user) {
            return await this.createUser(condition);
        }

        return user;
    }

    async getToken(user?: UserEntity, password: string = DEFAULT_PASSWORD) {
        if (!user) {
            user = await this.getUser();
        }
        let response = await this.testHelper.post('/auth/login').send({ email: user.email, password });
        return response.body.token;
    }

    async getAvailableEmail() {
        let email = faker.internet.email();
        const userRepo: UserRepository = this.testHelper.getRepository();
        if (await userRepo.findOne({ email })) {
            return await this.getAvailableEmail();
        } else {
            return email;
        }
    }
}
