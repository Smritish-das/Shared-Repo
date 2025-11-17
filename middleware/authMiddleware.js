const jwt = require("jsonwebtoken");
const { UnauthorizedError } = require("../utils/customErrorHandler");

module.exports.authenticate = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  // 1. Check if Authorization header exists
  if (!authHeader) {
    return next(new UnauthorizedError("Authorization header missing"));
  }

  // Expected format: "Bearer token"
  const token = authHeader.split(" ")[1];

  if (!token) {
    return next(new UnauthorizedError("Token is missing"));
  }

  try {
    //2.Verify token
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    // 3. Attach safe user data to req.user
    req.user = {
      _id: decodedData._id,
      email: decodedData.email,
      role: decodedData.role,
    };

    next(); // 4. Continue
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return next(new UnauthorizedError("Token has expired"));
    }
    return next(new UnauthorizedError("Invalid token"));
  }
};
