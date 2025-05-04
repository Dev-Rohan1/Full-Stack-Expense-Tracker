import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  HandCoins,
  PiggyBank,
  LogOut,
  Loader2,
} from "lucide-react";
import { AppContext } from "../contexts/AppContext";
import toast from "react-hot-toast";

const SideBar = ({ onLinkClick }) => {
  const { userData, userDataLoading } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logout successful");
    navigate("/login");
  };

  return (
    <aside className="h-full flex flex-col fixed w-60">
      {/* User Profile Section */}
      <div className="border-b py-3 border-gray-200 flex items-center gap-2 mb-2">
        {userDataLoading ? (
          <div className="flex items-center gap-3 w-full">
            <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
              <Loader2 className="h-5 w-5 text-gray-400 animate-spin" />
            </div>
            <div className="space-y-2">
              <div className="h-4 w-32 bg-gray-100 rounded animate-pulse"></div>
              <div className="h-3 w-24 bg-gray-100 rounded animate-pulse"></div>
            </div>
          </div>
        ) : (
          <>
            <img
              className="h-10 w-10 rounded-full object-cover border-2 border-gray-200"
              src={userData?.image || "https://via.placeholder.com/40"}
              alt="User avatar"
            />
            <div className="overflow-hidden">
              <p className="font-medium text-gray-700 truncate">
                {userData?.name || "User"}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {userData?.email || "user@example.com"}
              </p>
            </div>
          </>
        )}
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 overflow-y-auto">
        <ul className="space-y-3 pr-3">
          <li>
            <NavLink
              to="/dashboard"
              onClick={onLinkClick}
              className={({ isActive }) =>
                `group flex items-center px-4 py-2.5 rounded-lg transition-colors ${
                  isActive
                    ? "bg-blue-50 text-blue-600 font-medium"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-700"
                }`
              }
            >
              <LayoutDashboard className="mr-3 h-5 w-5 flex-shrink-0" />
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/income"
              onClick={onLinkClick}
              className={({ isActive }) =>
                `group flex items-center px-4 py-2.5 rounded-lg transition-colors ${
                  isActive
                    ? "bg-blue-50 text-blue-600 font-medium"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-700"
                }`
              }
            >
              <PiggyBank className="mr-3 h-5 w-5 flex-shrink-0" />
              Income
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/expense"
              onClick={onLinkClick}
              className={({ isActive }) =>
                `group flex items-center px-4 py-2.5 rounded-lg transition-colors ${
                  isActive
                    ? "bg-blue-50 text-blue-600 font-medium"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-700"
                }`
              }
            >
              <HandCoins className="mr-3 h-5 w-5 flex-shrink-0" />
              Expenses
            </NavLink>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className="w-full text-left group flex items-center px-4 py-2.5 rounded-lg transition-colors text-gray-600 hover:bg-gray-100 hover:text-gray-700"
            >
              <LogOut className="mr-3 h-5 w-5 flex-shrink-0" />
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default SideBar;
