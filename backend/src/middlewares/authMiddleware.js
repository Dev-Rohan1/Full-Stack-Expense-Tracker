import jwt from "jsonwebtoken";
import User from "../models/User.js";

const authMiddleware = async (req, res, next) => {
  const token = req.headers.token;

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized please login again" });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decodedToken.id);
    next();
  } catch (error) {
    console.log(error);

    return res.json({
      success: false,
      message: "Unauthorized please login again",
    });
  }
};

export default authMiddleware;
