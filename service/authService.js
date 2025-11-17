const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");
const {
  BadRequestError,
  UnauthorizedError,
} = require("../utils/customErrorHandler");

//  REGISTER USER
const registerUser = async (data) => {
  const { name, email, password, role } = data;

  // 1 Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new BadRequestError("Email already registered");
  }

  // 2 Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // 3 Create new user
  const newUser = new User({
    name,
    email,
    password: hashedPassword,
    role,
  });

  await newUser.save();

  // 4 Generate JWT token
  const token = jwt.sign(
    {
      _id: newUser._id,
      email: newUser.email,
      role: newUser.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  return {
    user: {
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
    },
    token,
  };
};

//  LOGIN USER
const loginUser = async (data) => {
  const { email, password } = data;

  // 1 Check if user exists
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new UnauthorizedError("Invalid email or password");
  }

  // 2 Compare passwords
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new UnauthorizedError("Invalid email or password");
  }

  // 3 Generate token
  const token = jwt.sign(
    {
      _id: user._id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  return {
    // user: {
    //   _id: user._id,
    //   name: user.name,
    //   email: user.email,
    //   role: user.role,
    // },
    token,
  };
};

//  EXPORTS
module.exports = {
  registerUser,
  loginUser,
};
