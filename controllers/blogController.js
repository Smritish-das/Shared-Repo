const blogService = require("../service/blogService");

module.exports.getPosts = async (req, res, next) => {
  try {
    const { page, limit } = req.query;
    const result = await blogService.getAllBlogs(page, limit);

    return res.status(200).json({
      success: true,
      ...result,
    });
  } catch (err) {
    next(err);
  }
};

module.exports.getPostById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const blog = await blogService.getBlogById(id);
    return res.status(200).json({ success: true, blog });
  } catch (err) {
    next(err);
  }
};

module.exports.createPost = async (req, res, next) => {
  try {
    const { title, content, category, tags, thumbnail } = req.body;
    const author = req.user._id;

    const newPost = await blogService.createPost({
      title,
      content,
      category,
      tags,
      thumbnail,
      author,
    });

    return res.status(201).json({
      success: true,
      message: "Post created successfully",
      post: newPost,
    });
  } catch (err) {
    next(err);
  }
};

module.exports.updatePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updated = await blogService.updatePost(
      id,
      req.user._id,
      req.user.role,
      updateData
    );

    return res.status(200).json({
      success: true,
      message: "Post updated successfully",
      post: updated,
    });
  } catch (err) {
    next(err);
  }
};

module.exports.deletePost = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deleted = await blogService.deletePost(
      id,
      req.user._id,
      req.user.role
    );

    return res.status(200).json({
      success: true,
      message: "Post deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};
