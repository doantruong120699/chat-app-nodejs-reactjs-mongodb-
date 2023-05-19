import { TestHelper } from '~core/tests/test.helper';
import { UserTestHelper } from './user-test.helper';
import { UserRepository } from '~users/repositories/user.repository';

describe('UserController (e2e)', () => {
    let testHelper = new TestHelper();
    let userTestHelper = testHelper.getTestHelperModule(UserTestHelper);

    beforeAll(async () => {
        await testHelper.initialize<UserRepository>(UserRepository);
    });

    it('Get current user', async () => {
        let user = await userTestHelper.getUser();
        return testHelper
            .get('/users/me')
            .authenticate(await userTestHelper.getToken(user))
            .isOk()
            .has('email')
            .notHas('password');
    });

    it('Get current user without token', async () => {
        return testHelper.get('/users/me').isAuthError();
    });

    it('Change password successfully', async () => {
        const password = 'Secret@123';
        const user = await userTestHelper.createUser({ password });
        return await testHelper
            .put('/users/change-password')
            .send({ oldPassword: password, newPassword: 'Secret@123' })
            .authenticate(await userTestHelper.getToken(user, password))
            .isNoContent();
    });

    it('Change password failed with an incorrect password', async () => {
        const password = 'Secret@123';
        const user = await userTestHelper.createUser({ password });
        return await testHelper
            .put('/users/change-password')
            .send({ oldPassword: 'Secret@1233123', newPassword: 'Ky616F8dAH3X' })
            .authenticate(await userTestHelper.getToken(user, password))
            .isValidateError();
    });
});
