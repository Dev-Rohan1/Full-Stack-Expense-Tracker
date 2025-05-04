import axios from "axios";
import { Plus, Trash2, TrendingDown, LoaderCircle } from "lucide-react";
import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../contexts/AppContext";
import CustomLineChart from "./CustomLineChart";

const ExpenseOverview = ({ expenseData, fetchExpenseData }) => {
  const [barData, setBarData] = useState([]);
  const [loadingId, setLoadingId] = useState(null);
  const navigate = useNavigate();
  const { backendUrl } = useContext(AppContext);

  const deleteExpense = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this expense?"
    );
    if (!confirmDelete) return;

    setLoadingId(id);
    try {
      const { data } = await axios.delete(
        `${backendUrl}/expense/delete-expense`,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
          data: { id },
        }
      );

      if (data.success) {
        toast.success(data.message);
        fetchExpenseData();
      } else {
        toast.error(data.message || "Failed to delete expense.");
      }
    } catch (error) {
      console.error("Delete failed:", error);
      toast.error("An error occurred while deleting the expense.");
    } finally {
      setLoadingId(null);
    }
  };

  useEffect(() => {
    const formattedData = expenseData
      .slice()
      .reverse()
      .map((item) => ({
        month: moment(item?.date || new Date()).format("Do MMM"),
        category: item?.category || "Unknown",
        amount: item?.amount || 0,
      }));
    setBarData(formattedData);
  }, [expenseData]);

  const reversedExpense = expenseData.slice().reverse();

  return (
    <div className="mb-5">
      {/* Overview Chart */}
      <div className="bg-white rounded-lg shadow border border-gray-100 p-4 md:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-lg md:text-xl font-semibold text-gray-700">
              Expense Overview
            </h1>
            <p className="text-sm text-gray-500">
              Track your spending over time and gain insights into where your
              money goes.
            </p>
          </div>
          <button
            className="flex items-center justify-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-md px-4 py-3 md:py-2.5 text-sm font-medium transition-colors cursor-pointer"
            onClick={() => navigate("/add-expense")}
          >
            <Plus className="h-4 w-4" />
            Add Expense
          </button>
        </div>

        {barData.length === 0 ? (
          <span className="text-red-500 font-medium mt-2 block">
            No expense overview data available to display.
          </span>
        ) : (
          <CustomLineChart data={barData} />
        )}
      </div>

      {/* Expense List */}
      <div className="bg-white rounded-lg shadow border border-gray-100 p-4 md:p-6 mt-6">
        <h2 className="text-lg md:text-xl font-semibold text-gray-700 mb-6">
          All Expenses
        </h2>

        {reversedExpense.length === 0 ? (
          <span className="text-red-500 font-medium">
            No expense data available to display.
          </span>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {reversedExpense.map((data, index) => (
              <div
                key={data?._id || index}
                className="flex items-center justify-between bg-gray-100 p-4 rounded-lg"
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="bg-red-100 border border-gray-200 shadow text-red-700 w-10 h-10 rounded-full flex items-center justify-center text-lg">
                    {data?.icon || "💸"}
                  </div>
                  <div className="flex flex-col truncate">
                    <span className="text-gray-800 font-medium truncate capitalize">
                      {data?.category || "Unknown"}
                    </span>
                    <span className="text-xs text-gray-500">
                      {data?.date
                        ? moment(data.date).format("Do MMM YYYY")
                        : "No date"}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-sm flex items-center gap-1 text-red-600 font-medium whitespace-nowrap">
                    - {data?.amount || 0}
                    <TrendingDown size={16} />
                  </span>
                  <button
                    disabled={loadingId === data._id}
                    onClick={() => deleteExpense(data._id)}
                    className="w-8 h-8 flex items-center justify-center rounded-md bg-white shadow"
                    title="Delete expense"
                  >
                    {loadingId === data._id ? (
                      <LoaderCircle
                        size={18}
                        className="animate-spin text-gray-600"
                      />
                    ) : (
                      <Trash2 size={18} className="text-gray-600" />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpenseOverview;
