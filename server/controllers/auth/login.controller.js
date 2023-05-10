const { LoginFail } = require('../../common/exceptions');
var loginService = require('../../services/auth/login.service');

exports.login = async (req, res) => {
    try {
        const token = await loginService.authenticate(req.body.email, req.body.password);
        return res.status(200).send(token);
    } 
    catch (error) {
        if (error instanceof LoginFail) {
            return res.status(400).send({ message: error.message });
        }
        return res.status(500).send({ message: error.message });
    }
};
  
  