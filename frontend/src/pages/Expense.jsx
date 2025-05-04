import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import SideBar from "../components/SideBar";
import ExpenseOverview from "../components/ExpenseOverview";
import axios from "axios";
import { AppContext } from "../contexts/AppContext";
import toast from "react-hot-toast";
import Loader from "../components/Loader";

const Expense = () => {
  const [expenseData, setExpenseData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { backendUrl } = useContext(AppContext);

  // ✅ Moved outside useEffect so it's accessible to JSX
  const fetchExpenseData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get(`${backendUrl}/expense/all-expenses`, {
        headers: {
          token: token,
        },
      });
      setExpenseData(data.expenseData);
    } catch (error) {
      console.error("Failed to fetch expense data", error);
      toast.error("Failed to fetch expense data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenseData();
  }, [backendUrl]);

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
            <main className="flex-1 overflow-y-auto px-4 py-6 md:px-6">
              {loading ? (
                <div className="flex items-center justify-center h-[70vh]">
                  <Loader />
                </div>
              ) : (
                <ExpenseOverview
                  expenseData={expenseData}
                  fetchExpenseData={fetchExpenseData}
                />
              )}
            </main>
          </div>
        </div>
      </section>
    </>
  );
};

export default Expense;
