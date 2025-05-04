import xlsx from "xlsx";

import Expense from "../models/Expense.js";

export const addExpense = async (req, res) => {
  const { icon, category, amount, date } = req.body;
  const userId = req.user?._id;

  if (!icon || !category || !amount) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  try {
    const newExpense = new Expense({
      userId,
      icon,
      category,
      amount: amount,
      date,
    });

    await newExpense.save();

    return res.status(201).json({
      success: true,
      message: "Expense added successfully",
      expenseData: newExpense,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to add Expense",
    });
  }
};

export const getAllIExpenses = async (req, res) => {
  const userId = req.user._id;

  try {
    const expense = await Expense.find({ userId });

    return res.json({
      success: false,
      message: "Expense fetched successfully",
      expenseData: expense,
    });
  } catch (error) {
    console.log(error);

    return res.json({ success: false, message: "Failed to fetch Expense" });
  }
};

export const deleteExpense = async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({
      success: false,
      message: "ID are required",
    });
  }

  try {
    const deleteExpense = await Expense.findByIdAndDelete(id);

    return res.json({
      success: true,
      message: "Expense deleted successfully",
    });
  } catch (error) {
    console.error(error);

    return res.json({ success: false, message: "Failed to delete expense" });
  }
};
