import { TestHelper } from '~core/tests/test.helper';
import { DEFAULT_PASSWORD } from '~users/constants/default-password.constant';
import { UserTestHelper } from './user-test.helper';
import { UserRepository } from '~users/repositories/user.repository';
import faker from 'faker';
import { UserEntity } from '~users/entities/user.entity';

describe('AuthController (e2e)', () => {
    let testHelper = new TestHelper();
    let userTestHelper = testHelper.getTestHelperModule(UserTestHelper);
    let user: UserEntity;

    beforeAll(async () => {
        await testHelper.initialize<UserRepository>(UserRepository);
    });

    it('Login success', async () => {
        const dataInput = {
            email: faker.internet.email(),
            password: DEFAULT_PASSWORD
        };
        await userTestHelper.createUser(dataInput);

        return testHelper
            .post('/auth/login')
            .send(dataInput)
            .isOk()
            .has(['token', 'user', 'expireAt'])
            .notHas('user.password');
    });

    it('Wrong password', async () => {
        user = await userTestHelper.getUser();

        return testHelper.post('/auth/login').send({ email: user.email, password: 'Secret@456' }).isAuthError();
    });

    it('Test validator email login', async () => {
        return testHelper.post('/auth/login').send({ email: 'wrong-email', password: 'Secret@456' }).isValidateError();
    });

    it('Test validator password login', async () => {
        let user = await userTestHelper.getUser();
        return testHelper.post('/auth/login').send({ email: user.email, password: 'wrong password' }).isValidateError();
    });

    it('Test validator email + password login', async () => {
        return testHelper
            .post('/auth/login')
            .send({ email: 'wrong-email', password: 'wrong password' })
            .isValidateError();
    });

    it('Test logout success', async () => {
        return testHelper
            .delete('/auth/logout')
            .authenticate(await userTestHelper.getToken())
            .isNoContent();
    });

    it('Test logout and using token to get user info', async () => {
        let token = await userTestHelper.getToken();
        await testHelper.delete('/auth/logout').authenticate(token);
        return testHelper.get('/users/me').authenticate(token).isForbiddenError();
    });

    it('Test logout without token', () => {
        return testHelper.delete('/auth/logout').isAuthError();
    });

    it('Test sign up with invalid data', async () => {
        const data = {
            email: 'email',
            password: '1234'
        };

        await testHelper.post('/auth/sign-up').send(data).isValidateError();
    });

    it('Test sign up with valid data', async () => {
        const data = {
            email: 'real.email@gmail.com',
            password: DEFAULT_PASSWORD
        };

        const { body } = await testHelper.post('/auth/sign-up').send(data).isOk();

        expect(typeof body.user).toEqual('object');
        expect(typeof body.token).toEqual('string');

        const createdUser = await userTestHelper.getUser({ email: data.email });
        expect(createdUser).not.toEqual(null);
    });
});
