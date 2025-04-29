import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Income from "./pages/Income";
import Expense from "./pages/Expense";
import Dashboard from "./pages/Dashboard";
import AppLayout from "./layout/AppLayout";

const App = () => {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/income" element={<Income />} />
        <Route path="/expense" element={<Expense />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </AppLayout>
  );
};

export default App;
