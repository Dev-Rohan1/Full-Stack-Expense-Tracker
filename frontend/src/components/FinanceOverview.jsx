import React from "react";
import CustomPiChart from "./CustomPiChart";

const FinanceOverview = ({ totalIncome, totalExpense, totalBalance }) => {
  const colors = ["#875CF5", "#FA2C37", "#FF6900"];

  const balanceData = [
    { Name: "Total Balance", Amount: totalBalance },
    { Name: "Total Income", Amount: totalIncome },
    { Name: "Total Expense", Amount: totalExpense },
  ];

  const hasValidData = [totalBalance, totalIncome, totalExpense].some(
    (value) => typeof value === "number" && value !== 0
  );

  return (
    <div>
      <h1 className="text-lg font-semibold text-gray-800">
        Financial Overview
      </h1>
      {hasValidData ? (
        <CustomPiChart
          data={balanceData}
          label="Total Balance"
          totalAmount={totalBalance}
          color={colors}
          showTextAnchor={true}
        />
      ) : (
        <p className="text-red-500 font-medium mt-2">
          No financial data available to display.
        </p>
      )}
    </div>
  );
};

export default FinanceOverview;
