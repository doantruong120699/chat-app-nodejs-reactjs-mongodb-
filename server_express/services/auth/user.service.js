const db = require("../../models");
const bcrypt = require("bcrypt");
const { promiseHandler } = require("../../common/utils");
const { generateTokens } = require("../../common/generateTokens");
const { LoginFail } = require("../../common/exceptions");
const { ProfileFields, UserFields } = require("../../common/table-field");

const userService = {
    async getUserbyId(id) {
        const [user, userError] = await promiseHandler(
            db.User.findOne({
                where: { id: id },
                attributes: [
                    UserFields.ID,
                    UserFields.USERNAME,
                    UserFields.EMAIL,
                    UserFields.firstName,
                    UserFields.LAST_NAME,
                    UserFields.IS_ACTIVE,
                    UserFields.CREATED_AT,
                ],
            })
        );
        if (!user || userError) {
            throw new Error("Error");
        }
        return user;
    },

    async getUserProfile(UserId) {
        const [data, dataError] = await promiseHandler(
            db.Profile.findOne({
                where: {
                    UserId: UserId,
                },
                attributes: [
                    ProfileFields.ID,
                    ProfileFields.ADDRESS,
                    ProfileFields.BIRTHDAY,
                    ProfileFields.GENDER,
                    ProfileFields.PHONE_NUMBER,
                    ProfileFields.AVATAR,
                ],
            })
        );
        if (!data || dataError) {
            throw new Error("Error");
        }
        return data.dataValues;
    },
};

module.exports = userService;
