import { Router } from "express";
import { getUser } from "../controllers/github.controller.js";

const router = Router();
router.get("/users/:username",getUser);

export default router;