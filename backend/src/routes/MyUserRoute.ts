import express from "express";
import MyUserController from "../controllers/MyUserController";
import { jwtCheck, jwtParse } from "../middleware/auth";
import { validateMyUserRequest } from "../middleware/validation";

// Create router instance
const router = express.Router();

// POST /api/my/user -> Create a new user
router.post("/", jwtCheck, MyUserController.createCurrentUser);

// PUT /api/my/user -> Update the current user
router.put(
  "/",
  jwtCheck,
  jwtParse,
  validateMyUserRequest,
  MyUserController.updateCurrentUser
);

export default router;
