require("dotenv").config();
const express = require("express");
const cors = require("cors");

const connectDB = require("./utils/db");
const blogRoutes = require("./routes/blogRoutes");
const authRoutes = require("./routes/authRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();
const port = process.env.PORT || 3000;

// 1. Connect DB
connectDB();

// 2. Middlewares
// app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 3. Mount Routes
app.use("/api", authRoutes);
app.use("/api", blogRoutes);

// 4. Global error handler (MUST BE LAST)
app.use(errorHandler.errorHandler);

// 6. Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
