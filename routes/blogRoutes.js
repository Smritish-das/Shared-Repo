const express = require("express");
const router = express.Router();

const blogController = require("../controllers/blogController");
const { authenticate } = require("../middleware/authMiddleware");
const { validate } = require("../middleware/validateRequest");

const {postSchema,updatePostSchema,} = require("../validations/authValidation");

// Public route → anyone can view blog list (summary)
router.get("/blogs", blogController.getPosts);

// Protected → Only logged-in users can view full blog content
router.get("/blogs/:id", authenticate, blogController.getPostById);

// Create Blog → Only logged-in users (preferably writers)
router.post(
  "/blogs",
  authenticate,
  validate(postSchema),
  blogController.createPost
);

// Update Blog → Only writer or admin
router.put(
  "/blogs/:id",
  authenticate,
  validate(updatePostSchema),
  blogController.updatePost
);

//  Delete Blog → Only writer or admin
router.delete("/blogs/:id", authenticate, blogController.deletePost);

module.exports = router;
