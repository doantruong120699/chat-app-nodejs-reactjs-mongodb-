const db = require("../../models");
const bcrypt = require('bcrypt');
const { promiseHandler } = require('../../common/utils');
const { generateTokens } = require('../../common/generateTokens');
const { LoginFail } = require("../../common/exceptions");

const userService = {
  async getUserbyId(id) {
    const [user, userError] = await promiseHandler(db.User.findOne({ where: { id: id } }));
    if (!user || userError) {
      throw new Error("Error");
    }
    return user;
  }
}

module.exports = userService;
