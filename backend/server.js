import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { config } from "dotenv";

import userRouter from "./routes/auth.js";
import authRoutes from "./routes/auth.js";
import uploadRoutes from "./routes/upload.js";
import excelFile from "./models/ExcelFile.js";
import fetch from "node-fetch";

// Load environment variables from .env file
config({ path: ".env" });

const app = express();

// Enable CORS for frontend requests
app.use(
  cors({
    origin: "http://localhost:3000", // React frontend URL
    credentials: true,
  })
);

// Middleware to parse JSON bodies
app.use(express.json());

// Routes
app.use("/api/user", userRouter);
app.use("/api/auth", authRoutes);
app.use("/api/upload", uploadRoutes);

// DELETE file route
app.delete("/api/upload/:id", async (req, res) => {
  try {
    const file = await Upload.findByIdAndDelete(req.params.id);
    if (!file) return res.status(404).json({ message: "File not found" });
    res.json({ success: true, message: "File deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting file" });
  }
});

// Home route
app.get("/", (req, res) => {
  res.json({ message: "This is home route working" });
});


// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    dbName: "excel_analytics_backend",
  })
  .then(() => console.log("MongoDb Connected...!"))
  .catch((err) => console.log(err));

const port = 1000;
app.listen(port, () => console.log(`server is running on port ${port}`));
