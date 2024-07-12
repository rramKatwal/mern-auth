import { comparePassword, hashedPassword } from "../functions/hashing.js";
import OTP from "../models/otpModel.js";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";

//=========Register========//
export const registerController = async (req, res) => {
  try {
    const { name, email, phone, address, password, cPassword } = req.body;
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Profile image is required.",
      });
    }
    const { filename } = req.file;
    //form-validation
    if (!name || !email || !phone || !address || !password || !cPassword) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }
    //confirm password
    if (password !== cPassword) {
      return res.status(400).json({
        success: false,
        message: "Password did not matched",
      });
    }
    const checkPhone = await userModel.findOne({ phone });
    if (checkPhone) {
      return res.status(400).json({
        success: false,
        message: "This number is already in use.",
      });
    }

    //check existing user
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already register. Please log in to continue.",
      });
    }
    //hashing password
    const hashPassword = await hashedPassword(password);
    //create user
    const user = await new userModel({
      name,
      email,
      phone,
      address,
      password: hashPassword,
      profileImage: filename,
    }).save();

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while registering user",
      error: error.message,
    });
  }
};

//=========login========//

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }
    // check registeredUsr
    const User = await userModel.findOne({ email });
    if (!User) {
      return res.status(401).json({
        success: false,
        message: "Email not registered. Please register to continue",
      });
    }
    // checkpassword
    const matchPassword = await comparePassword(password, User.password);
    if (!matchPassword) {
      return res.status(401).json({
        success: false,
        message: "Invalid password or Email",
      });
    }

    // generate web token
    const token = jwt.sign({ id: User._id }, process.env.JWT_SECRET_KEY);
    return res.status(200).json({
      success: true,
      message: "User login successfully",
      token,
      User: {
        id: User._id,
        name: User.name,
        email: User.email,
        phone: User.phone,
        address: User.address,
        role: User.role,
        img: User.profileImage,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while logging user",
      error: error.message,
    });
  }
};

//resetpassword
export const ResetPassword = async (req, res) => {
  try {
    const { otp, password, cPassword } = req.body;

    if (!otp || !password || !cPassword) {
      return res.status(200).json({
        success: false,
        message: "All fields are required",
      });
    }

    const otpData = await OTP.findOne({ OTP: otp });

    if (!otpData) {
      return res.status(200).json({
        success: false,
        message: "Invalid Token",
      });
    }

    const currentTime = new Date().getTime();
    const diff = otpData.expiresIn - currentTime;

    if (diff < 0) {
      return res.status(200).json({
        success: false,
        message: "Token Expired",
      });
    }

    if (password !== cPassword) {
      return res.status(200).json({
        success: false,
        message: "Passwords do not match. Please enter them correctly",
      });
    }
    const email = otpData.email;
    const hashPassword = await hashedPassword(password);
    const updatedUser = await userModel.findOneAndUpdate(
      { email },
      { $set: { password: hashPassword } },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Password changed successfully.",
      user: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
