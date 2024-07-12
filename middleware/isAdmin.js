import userModel from "../models/userModel.js";

export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    if (user.role !== "admin") {
      return res.status(401).json({
        success: false,
        message: "Unauthorized Access",
      });
    } else {
      next();
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
