const validator = (schema, data) => (req, res, next) => {
  const { value, error } = schema.validate(req[data]);
  if (error) {
    const message = error.details.map((detail) => detail.message).join(",");
    return res.status(400).json({
      message: message,
    });
  }
  req.value = value;
  return next();
};

const validatorAsync = (schema, data) => (req, res, next) => {

  console.log("value", req[data])
  const x = schema
              .validateAsync(req[data])
              .then(() => {});
  // console.log("123: ")

  // if (error) {
  //   const message = error.details.map((detail) => detail.message).join(",");
  //   return res.status(400).json({
  //     message: message,
  //   });
  // }
  // req.value = value;
  return next();
};

module.exports = { validator, validatorAsync };