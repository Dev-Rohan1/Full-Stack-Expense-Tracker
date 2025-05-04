import xlsx from "xlsx";

import Income from "../models/Income.js";

export const addIncome = async (req, res) => {
  const { icon, source, amount, date } = req.body;
  const userId = req.user?._id;

  if (!icon || !source || !amount) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  try {
    const newIncome = new Income({
      userId,
      icon,
      source,
      amount: amount,
      date,
    });

    await newIncome.save();

    return res.status(201).json({
      success: true,
      message: "Income added successfully",
      incomeData: newIncome,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to add income",
    });
  }
};

export const getAllIncomes = async (req, res) => {
  const userId = req.user._id;

  try {
    const income = await Income.find({ userId });

    return res.json({
      success: true,
      message: "Incomes fetched successfully",
      incomeData: income,
    });
  } catch (error) {
    console.log(error);

    return res.json({ success: false, message: "Failed to fetch incomes" });
  }
};

export const deleteIncome = async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({
      success: false,
      message: "ID are required",
    });
  }

  try {
    const deleteIncome = await Income.findByIdAndDelete(id);

    return res.json({
      success: true,
      message: "Income deleted successfully",
    });
  } catch (error) {
    console.error(error);

    return res.json({ success: false, message: "Failed to delete income" });
  }
};
