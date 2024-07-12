import { hashedPassword } from "../functions/hashing.js";
import userModel from "../models/userModel.js";

//get all users
export const getAllUser = async (req, res) => {
  try {
    const users = await userModel.find({});
    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No users found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      totalUsers: users.length,
      users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while getting users",
      error: error.message,
    });
  }
};

//get user by id
export const getUserById = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while getting user by id",
      error: error.message,
    });
  }
};

// updateuser
export const updateUserById = async (req, res) => {
  try {
    const { address, name } = req.body;

    const user = await userModel.findByIdAndUpdate(
      req.params.id,
      { $set: { name, address } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
        img: user.profileImage,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while updating user",
      error: error.message,
    });
  }
};

//delete user
export const deleteUserById = async (req, res) => {
  try {
    const user = await userModel.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Users deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while deleting user ",
      error: error.message,
    });
  }
};

//update profile picture
export const updateProfileById = async (req, res) => {
  try {
    const { filename } = req.file;
    const user = await userModel.findByIdAndUpdate(
      req.params.id,
      { $set: { profileImage: filename } },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
        img: user.profileImage,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while updating profile picture",
      error: error.message,
    });
  }
};
