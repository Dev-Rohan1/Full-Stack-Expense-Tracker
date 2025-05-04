import React, { useEffect, useState } from "react";
import CustomChartBar from "./CustomChartBar";

const Last30DaysExpense = ({ data }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (Array.isArray(data)) {
      const chartData = data.map((item) => ({
        category: item.category,
        amount: item.amount,
      }));
      setChartData(chartData);
    }
  }, [data]);

  return (
    <>
      <h1 className="text-lg font-semibold pt-6 pl-6 text-gray-700 ">
        Last 30 Days Expense
      </h1>
      {chartData.length > 0 ? (
        <CustomChartBar data={chartData} />
      ) : (
        <p className="text-red-500 px-6 mt-2 font-medium">
          No expesnse data available for the last 30 days.
        </p>
      )}
    </>
  );
};

export default Last30DaysExpense;
