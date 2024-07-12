import express from "express";
import {
  ResetPassword,
  loginController,
  registerController,
} from "../controllers/authController.js";
import upload from "../middleware/multer.js";
import { isSignIn } from "../middleware/signIn.js";
import { isAdmin } from "../middleware/isAdmin.js";
import { sendMail } from "../controllers/mailController.js";

const router = express.Router();

router.post("/register", upload.single("profileImage"), registerController);
router.post("/login", loginController);

// user route
router.get("/user-auth", isSignIn, (req, res) => {
  res.status(200).send({
    ok: true,
  });
});
//admin route
router.get("/admin-auth", isSignIn, isAdmin, (req, res) => {
  res.status(200).send({
    ok: true,
  });
});

router.post("/email", sendMail);
router.put("/reset-password", ResetPassword);

export default router;
