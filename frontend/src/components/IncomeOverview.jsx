import axios from "axios";
import {
  ArrowDownToLine,
  LoaderCircle,
  Plus,
  Trash2,
  TrendingUp,
} from "lucide-react";
import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../contexts/AppContext";
import IncomeChartBar from "./IncomeChartBar";

const IncomeOverview = ({ incomeData, fetchIncomeData }) => {
  const [barData, setBarData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { backendUrl } = useContext(AppContext);

  const deleteIncome = async (id) => {
    if (!window.confirm("Are you sure you want to delete this income entry?"))
      return;

    setLoading(true);
    try {
      const { data } = await axios.delete(
        `${backendUrl}/income/delete-income`,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
          data: { id },
        }
      );

      if (data.success) {
        toast.success(data.message);
        fetchIncomeData();
      } else {
        toast.error(data.message || "Failed to delete income.");
      }
    } catch (error) {
      console.error("Delete failed:", error);
      toast.error("An error occurred while deleting income.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const formattedData = incomeData
      .slice()
      .reverse()
      .map((item) => ({
        month: moment(item?.date || item?.month || new Date()).format("Do MMM"),
        name: item?.source || "Unknown",
        amount: item?.amount || 0,
      }));
    setBarData(formattedData);
  }, [incomeData]);

  return (
    <div className="mb-5">
      {/* Top Overview Card */}
      <div className="bg-white rounded-lg shadow border border-gray-100 p-4 md:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-lg md:text-xl font-semibold text-gray-700">
              Income Overview
            </h1>
            <p className="text-sm text-gray-500">
              Track your earnings over time and analyze your income trends.
            </p>
          </div>
          <button
            className="flex items-center justify-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-md px-4 py-3 md:py-2.5 text-sm font-medium transition-colors duration-200 cursor-pointer"
            onClick={() => navigate("/add-income")}
          >
            <Plus className="h-4 w-4" />
            Add Income
          </button>
        </div>

        {barData.length === 0 ? (
          <span className="text-red-500 font-medium mt-2 block">
            No income overview data available to display.
          </span>
        ) : (
          <IncomeChartBar data={barData} />
        )}
      </div>

      {/* Income Source List */}
      <div className="bg-white rounded-lg shadow border border-gray-100 p-4 md:p-6 mt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg md:text-xl font-semibold text-gray-700">
            Income Sources
          </h2>
        </div>

        {incomeData.length === 0 ? (
          <span className="text-red-500 font-medium mt-4 block">
            No income data available to display.
          </span>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            {incomeData
              .slice()
              .reverse()
              .map((data, index) => (
                <div
                  key={`${data?._id || index}`}
                  className="flex items-center justify-between bg-gray-100 p-4 rounded-lg"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="bg-green-100 border border-gray-200 shadow text-green-700 w-10 h-10 rounded-full flex items-center justify-center text-lg">
                      {data?.icon || "💰"}
                    </div>
                    <div className="flex flex-col truncate">
                      <span className="text-gray-800 font-medium truncate capitalize">
                        {data?.source || "Unknown"}
                      </span>
                      <span className="text-xs text-gray-500">
                        {data?.date
                          ? moment(data.date).format("Do MMM YYYY")
                          : "No date"}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-sm flex items-center gap-1 text-green-600 font-medium whitespace-nowrap">
                      + {data?.amount || 0}
                      <TrendingUp size={16} className="flex-shrink-0" />
                    </span>
                    <button
                      className="w-8 h-8 flex items-center justify-center rounded-md bg-white shadow cursor-pointer"
                      onClick={() => deleteIncome(data._id)}
                      disabled={loading}
                      title="Delete income"
                    >
                      {loading ? (
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

export default IncomeOverview;
