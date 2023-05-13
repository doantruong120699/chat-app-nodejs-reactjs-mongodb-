const { LoginFail } = require('../../common/exceptions');
const userService = require('../../services/auth/user.service');

exports.me = async (req, res) => {
    try {
        const userProfile = await userService.getUserProfile(req.user.id);
        let res_data = {
            ...req.user.dataValues,
            profile: {
                ...userProfile
            }
        };
        return res.status(200).send(res_data);
    } 
    catch (error) {
        return res.status(500).send({ message: error.message });
    }
};
