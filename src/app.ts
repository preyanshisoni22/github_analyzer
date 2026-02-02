import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import githubRoutes from "./routes/github.routes.js";
import { Request,Response,NextFunction } from "express";
import { errorHandler } from "./middleware/error.middleware.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/github", githubRoutes);
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});
app.use(errorHandler);
export default app;
 