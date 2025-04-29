import express from "express";

import {
  addExpense,
  getAllIExpenses,
  deleteExpense,
  downloadExpense,
} from "../controllers/expenseController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/add-expense", authMiddleware, addExpense);
router.get("/all-expenses", authMiddleware, getAllIExpenses);
router.delete("/delete-expense", authMiddleware, deleteExpense);
router.get("/download-expense", authMiddleware, downloadExpense);

export default router;
