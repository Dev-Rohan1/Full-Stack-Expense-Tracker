import React, { useContext, useEffect } from "react";

import Navbar from "../components/Navbar";
import SideBar from "../components/SideBar";
import BalanceCard from "../components/BalanceCard";
import RecentTransaction from "../components/RecentTransaction";
import ExpenseTransaction from "../components/ExpenseTransaction";
import IncomeTransaction from "../components/IncomeTransaction";
import { AppContext } from "../contexts/AppContext";
import Loader from "../components/Loader";

const Dashboard = () => {
  const { fetchDashboardData, dashboardData, dashboardDataLoadering } =
    useContext(AppContext);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchDashboardData(token);
    }
  }, []);

  return (
    <>
      <Navbar />
      <section className="mt-13">
        <div className="min-h-screen flex flex-col">
          <div className="flex flex-1 overflow-hidden">
            {/* Sidebar */}
            <aside className="hidden md:block w-full md:w-64 lg:w-60 border-r border-gray-200 bg-white overflow-y-auto">
              <SideBar />
            </aside>

            {/* Main content area */}
            <main className="flex-1 overflow-y-auto pt-3 md:pl-3">
              {dashboardDataLoadering ? (
                <div className="flex items-center justify-center h-[70vh]">
                  {" "}
                  <Loader />
                </div>
              ) : dashboardData ? (
                <>
                  <BalanceCard />
                  <RecentTransaction />
                  <ExpenseTransaction />
                  <IncomeTransaction />
                </>
              ) : (
                <p className="text-center text-gray-500">
                  No dashboard data available.
                </p>
              )}
            </main>
          </div>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
