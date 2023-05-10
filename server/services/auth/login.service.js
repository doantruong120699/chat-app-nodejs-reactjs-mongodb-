const db = require("../../models");
const bcrypt = require('bcrypt');
const { promiseHandler } = require('../../common/utils');
const { generateTokens } = require('../../common/generateTokens');
const { LoginFail } = require("../../common/exceptions");

const loginService = {
  async authenticate(email, password) {
    const [user, userError] = await promiseHandler(db.User.findOne({ where: { email: email } }));
    if (!user || userError) {
      throw new LoginFail("Invalid Email or Password!");
    }
    const passwordIsValid = bcrypt.compareSync(
      password,
      user.password
    );
    if (!passwordIsValid) {
      throw new LoginFail("Invalid Email or Password!");
    }

    const { accessToken, refreshToken } = await generateTokens(user);
    return { accessToken, refreshToken }
  }
}


module.exports = loginService;
