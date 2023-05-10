const Joi = require("joi");
var registerService = require("../../services/auth/register.service");

const isExistEmail = async (email) => {
  console.log("======value: ", email);
  // throw new Error("Ur description is sad please edit it");
  const check = await registerService.checkEmailExists(email);
  if (!check) {
    throw new Error("Ur description is sad please edit it");
  }
};

const RegisterSchema = Joi.object({
  username: Joi.string().trim().required(),
  email: Joi.string()
    .email()
    .trim()
    .required(),
    // .external(isExistEmail),
  password: Joi.string().trim().required(),
})

module.exports = {
  RegisterSchema,
};
