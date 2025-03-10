import express from "express";
import { body } from "express-validator";
import {
  loginCaptain,
  logoutCaptain,
  profileCaptain,
  registerCaptain,
} from "../controller/captain.controller.js";
import { authCaptain } from "../middlewares/auth.middleware.js";

const router = express.Router();
// register captain
router.post(
  "/register",
  [
    body("fullName.firstName")
      .isLength({ min: 3 })
      .withMessage("First name must be at least 3 characters long"),
    body("email").isEmail().withMessage("Please enter a valid email"),
    body("password")
      .isLength({ min: 5 })
      .withMessage("Password must be at least 5 characters long"),
    body("vehicle.color")
      .isLength({ min: 3 })
      .withMessage("Vehicle color must be at least 3 characters long"),
    body("vehicle.plate")
      .isLength({ min: 3 })
      .withMessage("Vehicle plate must be at least 3 characters long"),
    body("vehicle.capacity")
      .isLength({ min: 1 })
      .withMessage("Vehicle capacity must be at least 1 characters long"),
    body("vehicle.vehicleType")
      .isIn(["car", "motorcycle", "auto"])
      .withMessage("Vehicle type must be car, motorcycle or auto"),
  ],
  registerCaptain
);

// login captain
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Please enter a valid email"),
    body("password")
      .isLength({ min: 5 })
      .withMessage("Password must be at least 5 characters long"),
  ],
  loginCaptain
);

// profile captain
router.get("/profile", authCaptain, profileCaptain);

// logout captain
router.get("/logout", authCaptain, logoutCaptain);

export default router;
