const Joi = require("joi");

// Signup validation
module.exports.signupSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid("reader", "writer").required(),
});

// Login validation
module.exports.loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(), // login shouldn't limit length
});

// Create Post Validation (CREATE)
module.exports.postSchema = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  content: Joi.string().min(10).required(),
  category: Joi.string().min(3).max(30).required(),
  tags: Joi.array().items(Joi.string().min(1)).allow(null, ""), // not required
  thumbnail: Joi.string().uri().allow(null, ""), // optional
});

// Update Post Validation (UPDATE)
module.exports.updatePostSchema = Joi.object({
  title: Joi.string().min(3).max(100),
  content: Joi.string().min(10),
  category: Joi.string().min(3).max(30),
  tags: Joi.array().items(Joi.string().min(1)),
  thumbnail: Joi.string().uri(),
});


