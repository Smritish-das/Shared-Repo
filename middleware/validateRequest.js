const { BadRequestError } = require("../utils/customErrorHandler");

// Middleware Factory: validate(schema)
module.exports.validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      const errorMessage = error.details.map((d) => d.message).join(", ");
      return next(new BadRequestError(errorMessage));
    }

    next();
  };
};
