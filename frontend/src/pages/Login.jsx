import React, { useContext, useState } from "react";
import login_image from "../assets/login.svg";
import { Mail, KeyRound, LoaderCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../contexts/AppContext";
import axios from "axios";
import toast from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { backendUrl, setUserData, setUserToken } = useContext(AppContext);
  const navigate = useNavigate();

  const userLoginHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post(`${backendUrl}/user/login-user`, {
        email,
        password,
      });

      if (data.success) {
        setUserData(data.userData);
        setUserToken(data.token);
        localStorage.setItem("token", data.token);
        toast.success(data.message);
        navigate("/dashboard");
      } else {
        toast.error(data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || "Something went wrong. Try again.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="flex flex-col md:flex-row items-center bg-white rounded-xl shadow overflow-hidden max-w-4xl w-full border border-gray-100">
        {/* Image Section */}
        <div className="md:w-1/2 p-8 hidden md:block">
          <img
            src={login_image}
            alt="Login Illustration"
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Form Section */}
        <div className="md:w-1/2 px-5 py-6 md:p-12 w-full">
          <div className="text-center md:text-left mb-7">
            <h2 className="text-2xl font-bold text-gray-700 mb-1">
              User Login
            </h2>
            <p className="text-gray-600">
              Welcome back! Please login to continue
            </p>
          </div>

          <form className="space-y-4" onSubmit={userLoginHandler}>
            {/* Email Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="text-gray-400" size={20} />
              </div>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none transition placeholder:text-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <KeyRound className="text-gray-400" size={20} />
              </div>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none transition placeholder:text-sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  required
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Remember me
                </label>
              </div>
              {/* Optional: Add forgot password link */}
              {/* <Link to="/forgot-password" className="text-sm text-blue-600 hover:underline">Forgot password?</Link> */}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className={`${
                loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
              } w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-200 flex items-center justify-center`}
              disabled={loading}
              aria-label="Login"
            >
              {loading ? (
                <>
                  <LoaderCircle className="animate-spin mr-2" />
                </>
              ) : (
                "Login"
              )}
            </button>

            {/* Sign Up Link */}
            <div className="text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="font-medium text-blue-600 hover:text-blue-500 hover:underline"
              >
                Sign Up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
