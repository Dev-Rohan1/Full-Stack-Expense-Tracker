import React, { useEffect, useState } from "react";
import Last60DaysTransactionPiChart from "./Last60DaysTransactionPiChart";

const RecentIncomeChart = ({ data = [], totalIncome = 0 }) => {
  const [chartData, setChartData] = useState([]);

  const COLORS = ["#875CF5", "#FA2C37", "#FF6900", "#4f39f6"];

  useEffect(() => {
    if (Array.isArray(data)) {
      const formattedData = data.map((item) => ({
        name: item?.source || "Unknown",
        amount: item?.amount || 0,
      }));
      setChartData(formattedData);
    }
  }, [data]);

  return (
    <div>
      <h1 className="text-lg font-semibold pt-6 pl-6 text-gray-700">
        Last 60 Days Income
      </h1>
      <div className="pb-5 px-6">
        {Array.isArray(data) && data.length > 0 ? (
          <Last60DaysTransactionPiChart
            data={chartData}
            label="Total Income"
            totalAmount={`$${totalIncome}`}
            showTextAnchor={true}
            color={COLORS}
          />
        ) : (
          <span className="text-red-500 font-medium mt-2 block">
            No income data available for the last 60 days.
          </span>
        )}
      </div>
    </div>
  );
};

export default RecentIncomeChart;
