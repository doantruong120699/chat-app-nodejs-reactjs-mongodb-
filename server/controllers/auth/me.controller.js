const { LoginFail } = require('../../common/exceptions');
var loginService = require('../../services/auth/login.service');

exports.me = async (req, res) => {
    try {
        // console.log(req.user.id)
        return res.status(200).send(req.user);
    } 
    catch (error) {
        return res.status(500).send({ message: error.message });
    }
};
