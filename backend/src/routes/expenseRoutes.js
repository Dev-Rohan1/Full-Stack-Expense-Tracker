import express from "express";

import {
  addExpense,
  getAllIExpenses,
  deleteExpense,
} from "../controllers/expenseController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/add-expense", authMiddleware, addExpense);
router.get("/all-expenses", authMiddleware, getAllIExpenses);
router.delete("/delete-expense", authMiddleware, deleteExpense);

export default router;
