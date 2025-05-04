import express from "express";

import {
  addIncome,
  deleteIncome,
  getAllIncomes,
} from "../controllers/incomeController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/add-income", authMiddleware, addIncome);
router.get("/all-incomes", authMiddleware, getAllIncomes);
router.delete("/delete-income", authMiddleware, deleteIncome);

export default router;
