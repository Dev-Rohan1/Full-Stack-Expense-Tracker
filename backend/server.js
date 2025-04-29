import express from "express";
import cors from "cors";
import "dotenv/config";

import connectDB from "./src/db/connectDB.js";
import connectCloudinary from "./src/utils/connectCloudinary.js";
import userRoutes from "./src/routes/userRoutes.js";
import incomeRoutes from "./src/routes/incomeRoutes.js";
import expenseRoutes from "./src/routes/expenseRoutes.js";
import dashboardRoutes from "./src/routes/dashboardRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

connectDB();
connectCloudinary();

app.get("/", (req, res) => res.send("API is working"));
app.use("/user", userRoutes);
app.use("/income", incomeRoutes);
app.use("/expense", expenseRoutes);
app.use("/dashboard", dashboardRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🌐 Server running on port ${PORT}`));
