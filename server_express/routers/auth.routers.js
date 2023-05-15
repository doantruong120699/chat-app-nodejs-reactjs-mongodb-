const express = require('express');
const loginController = require("../controllers/auth/login.controller");
const registerController = require("../controllers/auth/register.controller");
const meController = require("../controllers/auth/me.controller");

const router = express.Router();
const { validator } = require("../middlewares/validate");
const { RegisterSchema } = require("../common/validator/auth.validator");
const authentication = require('../middlewares/authentication');

router.post('/login', loginController.login)
router.post('/register', validator(RegisterSchema, "body"), registerController.register)
router.get('/me', authentication, meController.me)

module.exports = router;
