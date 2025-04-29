import express from "express";

import {
  registerUser,
  loginUser,
  getUserData,
} from "../controllers/userController.js";

import imageUploader from "../utils/imageUploader.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register-user", imageUploader.single("image"), registerUser);
router.post("/login-user", loginUser);
router.get("/user-data", authMiddleware, getUserData);

export default router;
