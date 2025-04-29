import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";

import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  const imageFile = req.file;

  if (!name || !email || !password || !imageFile) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const uploadImage = await cloudinary.uploader.upload(imageFile.path);
    const imageUrl = uploadImage.secure_url;

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      image: imageUrl,
    });

    await newUser.save();

    return res.status(201).json({
      success: true,
      message: "Registration successful",
      userData: newUser,
      token: await generateToken(newUser._id),
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Registration failed",
    });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.json({ success: false, message: "Invalid password" });
    }

    return res.json({
      success: true,
      message: "Login successful",
      userData: user,
      token: await generateToken(user._id),
    });
  } catch (error) {
    console.error(error);

    return res.json({ success: false, message: "Login failed" });
  }
};

export const getUserData = async (req, res) => {
  try {
    const user = req.user;

    return res.json({
      success: true,
      message: "User data fetched successfully",
      userData: user,
    });
  } catch (error) {
    console.error(error);

    return res.json({ success: false, message: "Failed to fetch user data" });
  }
};
