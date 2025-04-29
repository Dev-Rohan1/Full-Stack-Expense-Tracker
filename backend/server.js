import express from "express";
import cors from "cors";
import "dotenv/config";

import userRoutes from "./src/routes/userRoutes.js";
import connectDB from "./src/db/connectDB.js";
import connectCloudinary from "./src/utils/connectCloudinary.js";

const app = express();

app.use(cors());
app.use(express.json());

connectDB();
connectCloudinary();

app.get("/", (req, res) => res.send("Api is working"));
app.use("/user", userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`🌐 Server running on port ${PORT}`));
