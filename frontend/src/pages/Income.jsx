import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import SideBar from "../components/SideBar";
import IncomeOverview from "../components/IncomeOverview";
import axios from "axios";
import { AppContext } from "../contexts/AppContext";
import toast from "react-hot-toast";
import Loader from "../components/Loader";

const Income = () => {
  const [incomeData, setIncomeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { backendUrl } = useContext(AppContext);

  const fetchIncomeData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");

      const { data } = await axios.get(`${backendUrl}/income/all-incomes`, {
        headers: {
          token: token,
        },
      });

      if (data.success) {
        setIncomeData(data.incomeData || []);
      } else {
        toast.error(data.message || "Failed to fetch income data.");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "An error occurred while fetching income data."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIncomeData();
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
            <main className="flex-1 overflow-y-auto px-4 py-6 md:px-6">
              {loading ? (
                <div className="flex items-center justify-center h-[70vh]">
                  <Loader />
                </div>
              ) : (
                <IncomeOverview
                  incomeData={incomeData}
                  fetchIncomeData={fetchIncomeData}
                />
              )}
            </main>
          </div>
        </div>
      </section>
    </>
  );
};

export default Income;
