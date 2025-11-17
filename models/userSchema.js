// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema(
//   {
//     _id: mongoose.Schema.Types.ObjectId,
//     name: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true, select: false },
//     role: { type: String, enum: ["reader", "writer"], default: "user" },
//     createdAt: { type: Date, default: Date.now },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("User", userSchema);


const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    role: {
      type: String,
      enum: ["reader", "writer", "admin"],
      default: "reader",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
