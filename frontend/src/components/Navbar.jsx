import {
  HandCoins,
  LayoutDashboard,
  LoaderCircle,
  LogOut,
  Menu,
  PiggyBank,
  X,
} from "lucide-react";
import React, { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../contexts/AppContext";
import toast from "react-hot-toast";

const Navbar = () => {
  const { userData, userDataLoading, logout } = useContext(AppContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleLogout = async () => {
    localStorage.removeItem("token");
    toast.success("Logout successful");
    navigate("/login");
  };
  return (
    <header className="fixed top-0 w-[95%] md:w-[90%] m-auto left-0 right-0 border-b border-b-gray-200 py-3 bg-[#fcfbfc] z-50 px-2 md:px-0">
      <nav className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <button
            onClick={toggleMenu}
            className="sm:hidden"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6 ml-[-10px] mt-0.5 text-gray-700 cursor-pointer" />
            )}
          </button>

          <Link to="/dashboard" className="text-xl font-semibold text-gray-700">
            Expense Tracker
          </Link>
        </div>

        <div className="flex items-center">
          {userDataLoading ? (
            <LoaderCircle className="animate-spin text-gray-500 h-6 w-6" />
          ) : (
            <div className="flex-shrink-0">
              <img
                className="h-8 w-8 rounded-full border-2 border-gray-300 object-cover"
                src={userData?.image || "https://via.placeholder.com/40"}
                alt={
                  userData?.name ? `${userData.name}'s profile` : "User profile"
                }
              />
            </div>
          )}
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out z-70 ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } sm:hidden`}
      >
        <div className="flex items-center justify-between px-4 pt-4 pb-3 border-b border-gray-200">
          <Link
            to="/dashboard"
            className="text-lg font-semibold text-gray-700"
            onClick={toggleMenu}
          >
            Expense Tracker
          </Link>
          <button onClick={toggleMenu}>
            <X className="h-6 w-6 text-gray-700 cursor-pointer" />
          </button>
        </div>

        <div className="px-2 pt-2 pb-3 space-y-2">
          <NavLink
            to="/dashboard"
            onClick={toggleMenu}
            className={({ isActive }) =>
              `group flex items-center px-3 py-2.5 text-sm font-medium rounded-md ${
                isActive
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-700 hover:bg-gray-100"
              }`
            }
          >
            <LayoutDashboard className="mr-3 h-5 w-5 text-gray-500 group-hover:text-gray-700" />
            Dashboard
          </NavLink>

          <NavLink
            to="/income"
            onClick={toggleMenu}
            className={({ isActive }) =>
              `group flex items-center px-3 py-2.5 text-sm font-medium rounded-md ${
                isActive
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-700 hover:bg-gray-100"
              }`
            }
          >
            <PiggyBank className="mr-3 h-5 w-5 text-gray-500 group-hover:text-gray-700" />
            Income
          </NavLink>

          <NavLink
            to="/expense"
            onClick={toggleMenu}
            className={({ isActive }) =>
              `group flex items-center px-3 py-2.5 text-sm font-medium rounded-md ${
                isActive
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-700 hover:bg-gray-100"
              }`
            }
          >
            <HandCoins className="mr-3 h-5 w-5 text-gray-500 group-hover:text-gray-700" />
            Expenses
          </NavLink>

          <button
            onClick={handleLogout}
            className="w-full group flex items-center px-3 py-2.5 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100 cursor-pointer"
          >
            <LogOut className="mr-3 h-5 w-5 text-gray-500 group-hover:text-gray-700" />
            Logout
          </button>
        </div>
      </div>

      {/* Backdrop */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 backdrop-blur-[1px] z-40 sm:hidden"
          onClick={toggleMenu}
        />
      )}
    </header>
  );
};

export default Navbar;
