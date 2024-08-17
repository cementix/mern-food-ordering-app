import express from "express";
import MyUserController from "../controllers/MyUserController";

// Create router instance
const router = express.Router();

// POST /api/my/user -> createCurrentUser
router.post("/", MyUserController.createCurrentUser);

export default router;
