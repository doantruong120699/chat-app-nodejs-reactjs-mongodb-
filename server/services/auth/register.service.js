const db = require("../../models");
const bcrypt = require('bcrypt');
const {promiseHandler} = require('../../common/utils');

const registerService = {
  async checkEmailExists(email) {
    const [user, userError] = await promiseHandler(
      db.User.findOne({
        where: {
          email: email,
        },
      })
    );
    if (user) {
      return false
    }
    return true;
  },

  async create(username, email, password) {
    const [user, userError] = await promiseHandler(
      db.User.create({
        username: username,
        email: email,
        password: bcrypt.hashSync(password, 8),
      })
    );
    let plainUser = user.get({plain: true})
    delete plainUser['password']
    return user;
  }
}

module.exports = registerService;
