import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import githubRoutes from "./routes/github.routes.js";
import { Request,Response,NextFunction } from "express";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/github", githubRoutes);

app.use((
    err:any,
    req:Request,
    res:Response,
    next : NextFunction

) => {
  if (err?.response?.status === 404) {
    return res.status(404).json({ message: "User not found" });
  }
  res.status(500).json({ message: "Server error" });
});
export default app;
 