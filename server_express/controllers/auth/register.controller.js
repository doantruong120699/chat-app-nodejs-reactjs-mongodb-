var registerService = require('../../services/auth/register.service');
const { RegisterSchema } = require("../../common/validator/auth.validator");

exports.register = async (req, res) => {
    try {
        const checkExists = await registerService.checkEmailExists(req.body.email);
        if (!checkExists){
            return res.status(400).send({ message: "Email already exists" });
        }
        const user = await registerService.create(req.body.username, req.body.email, req.body.password);
        return res.status(201).send(user);
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
};
