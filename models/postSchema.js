
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    title: { type: String, required: true },
    content: { type: String },
    status: {
      type: String,
      enum: ["draft", "published", "pending", "not-pending"],
      default: "pending",
    },
    category: { type: String, required: true },
    tags: { type: [String] },
    thumbnail: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Post', postSchema );