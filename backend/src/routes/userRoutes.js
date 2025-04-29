import express from "express";

import {
  registerUser,
  loginUser,
  getUserData,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/register-user", registerUser);
router.post("/login-user", loginUser);
router.get("/user-data", getUserData);

export default router;
