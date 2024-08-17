import express from "express";
import MyUserController from "../controllers/MyUserController";
import { jwtCheck } from "../middlleware/auth";

// Create router instance
const router = express.Router();

// POST /api/my/user -> createCurrentUser
router.post("/", jwtCheck, MyUserController.createCurrentUser);

export default router;
