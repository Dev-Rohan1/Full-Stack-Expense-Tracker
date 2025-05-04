import React, { useState, useRef, useEffect, useContext } from "react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { ChevronLeft, LoaderCircle } from "lucide-react";
import axios from "axios";
import { AppContext } from "../contexts/AppContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddExpense = () => {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState(""); // ✅ Added state for date
  const [icon, setIcon] = useState("💰");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const emojiPickerRef = useRef(null);
  const emojiButtonRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  const { backendUrl } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target) &&
        !emojiButtonRef.current.contains(event.target)
      ) {
        setShowEmojiPicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleEmojiSelect = (emojiData) => {
    setIcon(emojiData.native);
    setShowEmojiPicker(false);
  };

  const handleAmountChange = (e) => {
    const value = e.target.value;
    if (value === "" || /^[0-9]*\.?[0-9]{0,2}$/.test(value)) {
      setAmount(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data } = await axios.post(
        `${backendUrl}/expense/add-expense`,
        {
          icon,
          category,
          amount,
          date,
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );

      if (data.success) {
        toast.success(data.message);
        setAmount("");
        setCategory("");
        setDate(""); // ✅ Clear date after submission
        navigate("/expense");
      } else {
        toast.error(data.message || "Failed to add expense.");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center py-10 px-4 min-h-screen sm:min-h-full">
      <div className="w-full max-w-md bg-white rounded-lg shadow border border-gray-100 overflow-hidden">
        <div className="p-4 sm:p-6">
          <div className="flex items-center mb-6">
            <button
              onClick={() => window.history.back()}
              className="text-gray-600 hover:text-gray-800 mr-3"
              aria-label="Go back"
            >
              <span className="w-10 h-10 hover:bg-gray-50 hover:border border-gray-200 rounded-md flex items-center justify-center cursor-pointer transition-colors">
                <ChevronLeft size={24} />
              </span>
            </button>
            <h1 className="text-xl font-semibold text-gray-700">Add Expense</h1>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Emoji Picker */}
            <div className="mb-6 relative">
              <label
                htmlFor="emoji-button"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Icon
              </label>
              <div className="flex items-center">
                <button
                  id="emoji-button"
                  type="button"
                  ref={emojiButtonRef}
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  className="text-2xl w-12 h-12 flex items-center justify-center bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                  aria-label="Select emoji"
                >
                  {icon}
                </button>
                {showEmojiPicker && (
                  <div
                    className="absolute z-10 top-full mt-2 left-0 shadow-lg rounded-md"
                    ref={emojiPickerRef}
                  >
                    <Picker
                      data={data}
                      onEmojiSelect={handleEmojiSelect}
                      theme="light"
                      previewPosition="none"
                      emojiSize={20}
                      perLine={8}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Amount */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="amount"
              >
                Amount
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-700">
                  $
                </span>
                <input
                  type="text"
                  id="amount"
                  value={amount}
                  onChange={handleAmountChange}
                  className="w-full pl-8 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Expense amount"
                  inputMode="decimal"
                  required
                />
              </div>
            </div>

            {/* Category */}
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="category"
              >
                Category
              </label>
              <input
                type="text"
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Expense category"
                required
              />
            </div>

            {/* Date */}
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="date"
              >
                Date
              </label>
              <input
                type="date"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2.5 px-4 rounded-md transition duration-200 flex items-center justify-center ${
                isLoading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
              }`}
            >
              {isLoading ? (
                <LoaderCircle className="animate-spin" />
              ) : (
                "Add Expense"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddExpense;
