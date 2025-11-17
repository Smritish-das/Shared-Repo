const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const { validate } = require("../middleware/validateRequest");
const { signupSchema, loginSchema } = require("../validations/authValidation");

// Signup (Reader or Writer)
router.post("/auth/signup", validate(signupSchema), authController.signup);

// Login
router.post("/auth/login", validate(loginSchema), authController.login);

module.exports = router;
