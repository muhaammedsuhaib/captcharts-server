"use strict";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./configs/db.js";
import postRoutes from "./routes/post_routes.js";
import { error_handler } from "./middlewares/error_handler.js";

dotenv.config();

const app = express();

app.use(cors());

connectDB();

app.use(express.json());

app.use("/api/posts", postRoutes);

app.use(error_handler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
