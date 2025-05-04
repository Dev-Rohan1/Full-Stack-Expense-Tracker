import { ArrowRight, TrendingDown, TrendingUp } from "lucide-react";
import moment from "moment";
import React, { useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import RecentIncomeChart from "./RecentIncomeChart";
import { useNavigate } from "react-router-dom";

const IncomeTransaction = () => {
  const { dashboardData } = useContext(AppContext);

  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-4 mb-5">
      <div className="bg-white rounded-lg shadow border border-gray-100 h-full">
        <RecentIncomeChart
          data={dashboardData?.last60DaysIncome?.transactions}
          totalIncome={dashboardData?.last60DaysIncome?.transactions || 0}
        />
      </div>

      <div className="bg-white rounded-lg shadow border border-gray-100 p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold text-gray-800">Income</h1>
          <button
            className="flex items-center bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded px-2 py-1 text-sm gap-2 font-medium text-gray-700 transition-colors cursor-pointer"
            onClick={() => navigate("/income")}
          >
            See All <ArrowRight size={16} />
          </button>
        </div>

        <div className="space-y-4">
          {dashboardData?.last60DaysIncome?.transactions?.length > 0 ? (
            dashboardData.last60DaysIncome.transactions
              .slice(0, 5)
              .map((transaction, index) => (
                <div
                  key={`${transaction.id || transaction.date}-${index}`}
                  className="flex items-center justify-between space-y-2 mt-6"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="bg-red-100 w-10 h-10 rounded-full flex items-center justify-center">
                      <span className="text-lg">{transaction.icon}</span>
                    </div>
                    <div className="flex flex-col min-w-0 capitalize">
                      <span className="text-gray-800 font-medium truncate">
                        {transaction?.source}
                      </span>
                      <span className="text-xs text-gray-500">
                        {moment(transaction.date).format("Do MMM YYYY")}
                      </span>
                    </div>
                  </div>

                  <span className="text-sm flex items-center gap-1 text-red-500 font-medium whitespace-nowrap">
                    + ${transaction.amount}{" "}
                    <TrendingUp size={16} className="flex-shrink-0" />
                  </span>
                </div>
              ))
          ) : (
            <div className="text-red-500 font-medium mt-2">
              <span>You haven't made any income.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default IncomeTransaction;
