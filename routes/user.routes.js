import express from "express";
import { body } from "express-validator";
import {
  getUserProfile,
  loginUser,
  logoutUser,
  registerUser,
} from "../controller/user.controller.js";
import { authUser } from "../middlewares/auth.middleware.js";
const router = express.Router();

//register
router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Please enter a valid email"),
    body("fullName.firstName")
      .isLength({ min: 3 })
      .withMessage("First name must be at least 3 characters long"),
    body("password")
      .isLength({ min: 5 })
      .withMessage("Password must be at least 5 characters long"),
  ],
  registerUser
);

//login
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Please enter a valid email"),
    body("password")
      .isLength({ min: 5 })
      .withMessage("Password must be at least 5 characters long"),
  ],
  loginUser
);

//profile
router.get("/profile", authUser, getUserProfile);

//logout
router.get("/logout", authUser, logoutUser);

export default router;
