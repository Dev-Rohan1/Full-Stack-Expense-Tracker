import xlsx from "xlsx";

import Expense from "../models/Expense.js";

export const addExpense = async (req, res) => {
  const { icon, category, amount } = req.body;
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
  try {
    const income = await Expense.find();

    return res.json({
      success: false,
      message: "Expense fetched successfully",
      expenseData: income,
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

export const downloadExpense = async (req, res) => {
  const userId = req.user._id;

  try {
    const expenses = await Expense.find({ userId }).sort({ data: -1 });

    const data = expenses.map((expense) => ({
      icon: expense.icon,
      category: expense.category,
      amount: expense.amount,
      date: expense.date,
    }));

    const workbook = xlsx.utils.book_new();
    const worksheet = xlsx.utils.json_to_sheet(data);

    xlsx.utils.book_append_sheet(workbook, worksheet, "Incomes");
    xlsx.writeFile(workbook, "expenses.xlsx");

    res.download("expenses.xlsx");

    return res.json({
      success: true,
      message: "Expeneses downloaded successfully",
    });
  } catch (error) {
    console.error(error);

    return res.json({
      success: false,
      message: "Failed to download Expeneses",
    });
  }
};
