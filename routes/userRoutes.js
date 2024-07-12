import express from "express";

import {
  deleteUserById,
  getAllUser,
  getUserById,
  updateProfileById,
  updateUserById,
} from "../controllers/userController.js";
import { isSignIn } from "../middleware/signIn.js";
import { isAdmin } from "../middleware/isAdmin.js";
import upload from "../middleware/multer.js";

const router = express.Router();

router.get("/all-users", isSignIn, isAdmin, getAllUser);
router.get("/:id", isSignIn, getUserById);
router.put("/update/:id", isSignIn, updateUserById);
router.delete("/delete/:id", isSignIn, deleteUserById);
router.put(
  "/update/image/:id",
  upload.single("profileImage"),
  isSignIn,
  updateProfileById
);

export default router;
