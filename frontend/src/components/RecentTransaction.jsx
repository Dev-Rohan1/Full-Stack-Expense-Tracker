import React, { useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import { TrendingDown, TrendingUp } from "lucide-react";
import moment from "moment";
import FinanceOverview from "./FinanceOverview";

const RecentTransaction = () => {
  const { dashboardData } = useContext(AppContext);
  const recentTransactions = dashboardData?.recentTransactions || [];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-4">
      {/* Recent Transactions Card */}
      <div className="bg-white rounded-lg shadow border border-gray-100 p-6">
        <h1 className="text-lg font-semibold text-gray-800">
          Recent Transactions
        </h1>

        {recentTransactions.length === 0 ? (
          <span className="text-red-500 font-medium block mt-2">
            You haven't made any recent transactions.
          </span>
        ) : (
          <div className="space-y-6 mt-6">
            {recentTransactions
              .slice(0, 5) // limit to 5
              .map((transaction, index) => (
                <div
                  key={transaction._id || index}
                  className="flex items-center justify-between"
                >
                  {/* Left Side: Icon and Info */}
                  <div className="flex items-center gap-3">
                    <div
                      className={`${
                        transaction.type === "Income"
                          ? "bg-green-100"
                          : "bg-red-100"
                      } w-10 h-10 rounded-full flex items-center justify-center`}
                    >
                      <span className="text-lg">
                        {transaction.icon || "💰"}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-gray-800 font-medium capitalize truncate max-w-[150px]">
                        {transaction.category ||
                          transaction.source ||
                          "Unknown"}
                      </span>
                      <span className="text-xs text-gray-500">
                        {transaction.date
                          ? moment(transaction.date).format("Do MMM YYYY")
                          : "No date"}
                      </span>
                    </div>
                  </div>

                  {/* Right Side: Amount */}
                  <div
                    className={`flex items-center gap-1 font-medium ${
                      transaction.type === "Income"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    <span>
                      {transaction.type === "Income" ? "+ " : "- "}
                      <span className="text-sm">${transaction.amount}</span>
                    </span>
                    {transaction.type === "Income" ? (
                      <TrendingUp size={16} className="mt-0.5" />
                    ) : (
                      <TrendingDown size={16} className="mt-0.5" />
                    )}
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>

      {/* Finance Overview Card */}
      <div className="bg-white rounded-lg shadow border border-gray-100 p-4 md:p-6 h-full w-full">
        <FinanceOverview
          totalBalance={dashboardData?.totalBalance}
          totalExpense={dashboardData?.totalExpense}
          totalIncome={dashboardData?.totalIncome}
        />
      </div>
    </div>
  );
};

export default RecentTransaction;
