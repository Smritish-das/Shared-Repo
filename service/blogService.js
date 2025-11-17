const Post = require("../models/postSchema");
const {BadRequestError,NotFoundError,UnauthorizedError} = require("../utils/customErrorHandler");
const mongoose = require("mongoose");


module.exports = {
  // GET ALL BLOGS (with pagination + summary)
  getAllBlogs: async (page, limit) => {
    // 1. convert page & limit
    const pageNumber = Number(page) || 1;
    const limitNumber = Number(limit) || 10;

    // 2. calculate skip
    const skip = (pageNumber - 1) * limitNumber;

    // 3. query posts with selected fields
    const posts = await Post.find()
      .select("title category thumbnail content author createdAt")
      .skip(skip)
      .limit(limitNumber)
      .populate("author", "name");

    //4.Generate summary for each blog
    const blogsWithSummary = posts.map((post) => ({
      ...post.toObject(),
      summary: post.content.slice(0, 120) + "...",
    }));

    //5.Count total posts
    const totalBlogs = await Post.countDocuments();

    //6.Return pagination response
    return {
      blogs: blogsWithSummary,
      totalBlogs,
      totalPages: Math.ceil(totalBlogs / limitNumber),
      currentPage: pageNumber,
    };
  },
  // GET BLOG BY ID (full details)
  getBlogById: async (id) => {
    // 1. validate objectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestError("Invalid blog ID");
    }

    // 2. find blog by id & populate author
    const blog = await Post.findById(id).populate("author", "name");

    // 3. if not found -> throw error
    if (!blog) {
      throw new NotFoundError("Blog not found");
    }

    // 4. return full blog
    return blog;
  },
  //createPost Service
  createPost: async (postData) => {
    //1. Extract data from the request body
    const { title, content, category, tags, thumbnail, author } = postData;
    //2. Create new Post instance
    // 2️⃣ Create new post object
    const newPost = new Post({
      title,
      content,
      category,
      tags,
      thumbnail,
      author,
      status: "pending",
    });
    // 3️⃣ Save to DB
    await newPost.save();

    // 4️⃣ Return saved post
    return newPost;
  },
  //updatePost Service
  updatePost: async (id, userId, userRole, updateData) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestError("Invalid post ID");
    }

    const post = await Post.findById(id);
    if (!post) throw new NotFoundError("Post not found");

    const isAuthor = post.author.toString() === userId.toString();
    const isAdmin = userRole === "admin";

    if (!isAuthor && !isAdmin) {
      throw new UnauthorizedError("You are not allowed to update this post");
    }

    Object.assign(post, updateData);

    await post.save();
    return post;
  },

  //deletePost Service
  deletePost: async (id, userId, userRole) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestError("Invalid post ID");
    }

    const post = await Post.findById(id);
    if (!post) throw new NotFoundError("Post not found");

    const isAuthor = post.author.toString() === userId.toString();
    const isAdmin = userRole === "admin";

    if (!isAuthor && !isAdmin) {
      throw new UnauthorizedError("You are not allowed to delete this post");
    }

    await Post.findByIdAndDelete(id);
    return { message: "Post deleted successfully" };
  },
};