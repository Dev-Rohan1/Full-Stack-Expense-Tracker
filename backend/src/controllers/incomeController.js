import xlsx from "xlsx";

import Income from "../models/Income.js";

export const addIncome = async (req, res) => {
  const { icon, source, amount } = req.body;
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
      amount: Number(amount),
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
  try {
    const income = await Income.find();

    return res.json({
      success: false,
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

export const downloadIncome = async (req, res) => {
  const userId = req.user._id;

  try {
    const incomes = await Income.find({ userId }).sort({ data: -1 });

    const data = incomes.map((income) => ({
      icon: income.icon,
      source: income.source,
      amount: income.amount,
      date: income.date,
    }));

    const workbook = xlsx.utils.book_new();
    const worksheet = xlsx.utils.json_to_sheet(data);

    xlsx.utils.book_append_sheet(workbook, worksheet, "Incomes");
    xlsx.writeFile(workbook, "incomes.xlsx");

    res.download("incomes.xlsx");

    return res.json({
      success: true,
      message: "Incomes downloaded successfully",
    });
  } catch (error) {
    console.error(error);

    return res.json({ success: false, message: "Failed to download incomes" });
  }
};
