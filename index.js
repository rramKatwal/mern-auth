import express from "express";
import Database from "./functions/database.js";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the React app
app.use(express.static(path.resolve(__dirname, "client", "dist")));

// Serve images from public/images directory
app.use("/images", express.static(path.join(__dirname, "public/images")));

// API routes
app.use("/auth", authRoutes);
app.use("/users", userRoutes);

const port = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.send("Hi there!! Welcome to my mer authentication.");
});

// Handle all other routes by serving the React app
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
});

app.listen(port, () => {
  Database();
  console.log(`Server is running on port ${port}`);
});
