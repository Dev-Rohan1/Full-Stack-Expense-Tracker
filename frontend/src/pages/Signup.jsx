import React, { useContext, useState } from "react";
import signup_image from "../assets/signup.svg";
import {
  Mail,
  KeyRound,
  UserRound,
  Camera,
  ArrowLeft,
  LoaderCircle,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../contexts/AppContext";
import { toast } from "react-hot-toast";

const Signup = () => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const { backendUrl, setUserData, setUserToken } = useContext(AppContext);

  const navigate = useNavigate();

  const nextStep = () => {
    if (name && email && password) {
      setStep(2);
    }
  };

  const prevStep = () => {
    setStep(1);
  };

  const userSignupHanlder = async (e) => {
    e.preventDefault();

    if (!image) {
      toast.error("Please upload a profile image.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("image", image);

      const { data } = await axios.post(
        `${backendUrl}/user/register-user`,
        formData
      );

      if (data.success) {
        setUserData(data.userData);
        setUserToken(data.token);
        localStorage.setItem("token", data.token);
        toast.success(data.message);
        navigate("/dashboard");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="flex flex-col md:flex-row items-center bg-white rounded-xl shadow overflow-hidden max-w-4xl w-full border border-gray-200">
        {/* Image Section */}
        <div className="md:w-1/2 p-8 hidden md:block">
          <img
            src={signup_image}
            alt="signup_image"
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Form Section */}
        <div className="md:w-1/2 px-5 py-6 md:p-12 w-full">
          <div className="text-center md:text-left mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {step === 1 ? "Create Account" : "Upload Profile Picture"}
            </h2>
            <p className="text-gray-600">
              {step === 1
                ? "Join us today! Fill in your details to get started"
                : "Add a profile picture to complete your account"}
            </p>
          </div>

          <form onSubmit={userSignupHanlder}>
            {step === 1 ? (
              <div className="space-y-4">
                {/* Name Input */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <UserRound className="text-gray-400" size={20} />
                  </div>
                  <input
                    name="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none transition placeholder:text-sm"
                    required
                  />
                </div>

                {/* Email Input */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="text-gray-400" size={20} />
                  </div>
                  <input
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none transition placeholder:text-sm"
                    required
                  />
                </div>

                {/* Password Input */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <KeyRound className="text-gray-400" size={20} />
                  </div>
                  <input
                    name="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none transition placeholder:text-sm"
                    required
                  />
                </div>

                {/* Terms Checkbox */}
                <div className="flex items-start mt-2">
                  <div className="flex items-center h-5">
                    <input
                      id="terms"
                      name="terms"
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      required
                    />
                  </div>
                  <label
                    htmlFor="terms"
                    className="ml-2 block text-sm text-gray-700"
                  >
                    I accept the terms and conditions
                  </label>
                </div>

                {/* Next Button */}
                <button
                  type="button"
                  onClick={nextStep}
                  className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200 ${
                    !name || !email || !password
                      ? "opacity-50 cursor-not-allowed"
                      : "cursor-pointer"
                  }`}
                  disabled={!name || !email || !password}
                >
                  Next
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Back Button */}
                <button
                  type="button"
                  onClick={prevStep}
                  className="flex items-center text-blue-600 hover:text-blue-800 mb-4 transition-colors"
                >
                  <ArrowLeft size={18} className="mr-1" />
                  Back
                </button>

                {/* Profile Image Upload */}
                <div className="flex flex-col items-center">
                  <div className="relative group mb-3">
                    <div className="w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden border-2 border-gray-200">
                      {image ? (
                        <img
                          src={URL.createObjectURL(image)}
                          alt="Profile preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="text-gray-400">
                          <Camera size={32} />
                        </div>
                      )}
                    </div>
                    <label
                      htmlFor="profile-image"
                      className="absolute -bottom-2 -right-2 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700 transition-colors shadow-md"
                    >
                      <Camera size={16} />
                      <input
                        id="profile-image"
                        name="profileImage"
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files[0])}
                        className="hidden"
                      />
                    </label>
                  </div>
                  <span className="text-sm text-gray-500 mb-6">
                    {image ? "Change image" : "Upload profile picture"}
                  </span>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className={`${
                      loading || !image ? "opacity-50 cursor-not-allowed" : ""
                    } w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-200 flex items-center justify-center`}
                    disabled={loading || !image}
                  >
                    {loading ? (
                      <LoaderCircle className="animate-spin" />
                    ) : (
                      "Create Account"
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Login Link */}
            <div className="text-center text-sm text-gray-600 mt-6">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-blue-600 hover:text-blue-500 transition-colors hover:underline"
              >
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
