import { User } from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  // if any field is missing then
  if (name == "" || email == "" || password == "")
    return res.json({
      message: "All feilds are required",
    });
  // if user already exist
  let user = await User.findOne({ email });
  if (user) return res.json({ message: "User already exist", success: false });

  const hashPassword = await bcrypt.hash(password, 10);

  user = await User.create({ name, email, password: hashPassword });

  res.json({ message: "User created successfully....!", success: true, user });
  // console.log("Printing the data = ",req.body)
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  // if any field is missing then
  if (email == "" || password == "")
    return res.json({
      message: "All feilds are required",
    });
  // if user already exist
  const user = await User.findOne({ email });
  if (!user) return res.json({ message: "User not found", success: false });

  const validPass = await bcrypt.compare(password, user.password);
  if (!validPass)
    return res.status(400).json({ message: "Invalid password", success: false });

  // create token
  const token = jwt.sign({ userId : user._id }, process.env.JWT ,{
    expiresIn: "1d",
  });


  // if user is found then send the user data
  res.json({
    message: "User logged in successfully....!",
    token,
    success: true
  });
};
