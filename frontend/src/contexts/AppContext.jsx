import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [userToken, setUserToken] = useState(null);
  const [userDataLoading, setUserDataLoading] = useState(false);
  const [dashboardData, setDashboardData] = useState(null);
  const [dashboardDataLoadering, setDashboardDataLoading] = useState(false);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const fetchUserData = async (token) => {
    setUserDataLoading(true);
    try {
      const { data } = await axios.get(`${backendUrl}/user/user-data`, {
        headers: {
          token,
        },
      });

      if (data.success) {
        setUserData(data.userData);
      } else {
        toast.error(data.message || "Failed to fetch user data.");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "An error occurred.");
    } finally {
      setUserDataLoading(false);
    }
  };

  const fetchDashboardData = async (token) => {
    setDashboardDataLoading(true);
    try {
      const { data } = await axios.get(
        `${backendUrl}/dashboard/dashboard-data`,
        {
          headers: {
            token,
          },
        }
      );

      if (data.success) {
        setDashboardData(data);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      setDashboardDataLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setUserToken(token);
      fetchUserData(token);
      fetchDashboardData(token);
    }
  }, []);

  const value = {
    backendUrl,
    userToken,
    setUserToken,
    userData,
    setUserData,
    userDataLoading,
    dashboardData,
    setDashboardData,
    fetchDashboardData,
    dashboardDataLoadering,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
