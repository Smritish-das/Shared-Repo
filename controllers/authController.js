const { registerUser, loginUser } = require("../service/authService");

module.exports.signup = async (req, res, next) => {
  try {
    // Joi already validated req.body
    const result = await registerUser(req.body);

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      ...result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports.login = async (req, res, next) => {
  try {
    // Joi already validated req.body
    const result = await loginUser(req.body);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      ...result,
    });
  } catch (error) {
    next(error);
  }
};
