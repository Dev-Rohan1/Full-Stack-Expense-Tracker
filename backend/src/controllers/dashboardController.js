import Income from "../models/Income.js";
import Expense from "../models/Expense.js";

import { isValidObjectId, Types } from "mongoose";

const getDashboardData = async (req, res) => {
  try {
    const userId = req.user._id;

    const userObjectId = new Types.ObjectId(String(userId));

    const totalIncome = await Income.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const totalExpense = await Expense.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const last60DaysTransactions = await Income.find({
      userId,
      date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
    }).sort({ date: -1 });

    const incomeLast60Days = last60DaysTransactions.reduce(
      (sum, transaction) => sum + transaction.amount,
      0
    );

    const last30DaysExpenseTransactions = await Expense.find({
      userId,
      date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
    }).sort({ date: -1 });

    const expenseLast30Days = last30DaysExpenseTransactions.reduce(
      (sum, transaction) => sum + transaction.amount,
      0
    );

    const lastTranscations = [
      ...(await Income.find({ userId }).sort({ date: -1 }).limit(5)).map(
        (tnx) => ({
          ...tnx.toObject(),
          type: "Income",
        }),
        ...(await Expense.find({ userId }).sort({ date: -1 }).limit(5)).map(
          (tnx) => ({
            ...tnx.toObject(),
            type: "Expense",
          })
        )
      ),
    ].sort((a, b) => new Date(b.date) - new Date(a.date));

    return res.json({
      success: true,
      message: "Dashboard data fetched successfully",

      totalBalance:
        (totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0),
      totalIncome: totalIncome[0]?.total || 0,
      totalExpense: totalExpense[0]?.total || 0,
      last30DaysExpense: {
        total: expenseLast30Days,
        transactions: last30DaysExpenseTransactions,
      },
      last60DaysIncome: {
        total: incomeLast60Days,
        transactions: last60DaysTransactions,
      },
      recentTransactions: lastTranscations,
    });
  } catch (error) {
    console.log(error);

    return res.json({ success: false, message: "Failed to fetch dashboard" });
  }
};

export default getDashboardData;
