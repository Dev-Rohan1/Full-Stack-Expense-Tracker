import React, { useContext } from "react";
import { Scale, PiggyBank, HandCoins } from "lucide-react";
import { AppContext } from "../contexts/AppContext";

const BalanceCard = () => {
  const { dashboardData } = useContext(AppContext);

  const formatCurrency = (amount) => {
    const number = Number(amount) || 0;
    return number.toLocaleString();
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
      {/* Total Balance Card */}
      <div className="border border-gray-100 shadow-sm rounded-lg p-4 flex items-center gap-3">
        <div className="bg-[#7a51f0] w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full text-white flex-shrink-0">
          <Scale size={23} />
        </div>
        <div className="flex flex-col">
          <span className="text-gray-700 font-semibold">Total Balance</span>
          <span className="text-gray-600 font-medium">
            ${formatCurrency(dashboardData?.totalBalance)}
          </span>
        </div>
      </div>

      {/* Total Income Card */}
      <div className="border border-gray-100 shadow-sm rounded-lg p-4 flex items-center gap-3">
        <div className="bg-[#fd5d08] w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full text-white flex-shrink-0">
          <PiggyBank size={23} />
        </div>
        <div className="flex flex-col">
          <span className="text-gray-700 font-semibold">Total Income</span>
          <span className="text-gray-600 font-medium">
            ${formatCurrency(dashboardData?.totalIncome)}
          </span>
        </div>
      </div>

      {/* Total Expense Card */}
      <div className="border border-gray-100 shadow-sm rounded-lg p-4 flex items-center gap-3">
        <div className="bg-[#f62732] w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full text-white flex-shrink-0">
          <HandCoins size={23} />
        </div>
        <div className="flex flex-col">
          <span className="text-gray-700 font-semibold">Total Expense</span>
          <span className="text-gray-600 font-medium">
            ${formatCurrency(dashboardData?.totalExpense)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BalanceCard;
