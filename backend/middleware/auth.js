import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

export const isAthunticated = async (req, res, next) => {
  const token = req.header("Auth");

  //  console.log("checking token",token)

  if (!token) {
    return res.json({ message: "No token found, Login First", success: false });
  }

  const decoded = jwt.verify(token, process.env.JWT);

  const id = decoded.userId;

  let user = await User.findById(id);
  if (!user) return res.json({ message: "User not found", success: false });

  req.user = user;
    next();
};
