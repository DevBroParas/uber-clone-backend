import { BlacklistToken } from "../models/blacklistToken.model.js";
import { Captain } from "../models/captain.model.js";
import { createCaptain } from "../services/captain.service.js";
import { validationResult } from "express-validator";

//register captain
export const registerCaptain = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { fullName, email, password, vehicle } = req.body;

  const captainExists = await Captain.findOne({ email });
  if (captainExists) {
    return res.status(400).json({ message: "Captain already exists" });
  }

  const hashedPassword = await Captain.hashPassword(password);

  const captain = await createCaptain({
    firstName: fullName.firstName,
    lastName: fullName.lastName,
    email,
    password: hashedPassword,
    color: vehicle.color,
    plate: vehicle.plate,
    capacity: vehicle.capacity,
    vehicleType: vehicle.vehicleType,
  });

  const token = captain.generateAuthToken();

  res.status(201).json({ captain, token });
};

// login captain
export const loginCaptain = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;
  const captain = await Captain.findOne({ email }).select("+password");

  if (!captain) {
    return res.status(404).json({ message: "Captain not found" });
  }

  const isMatch = await captain.comparePassword(password);

  if (!isMatch) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const token = captain.generateAuthToken();

  res.cookie("token", token);

  res.status(200).json({ captain, token });
};

// profile captain
export const profileCaptain = async (req, res, next) => {
  res.status(200).json(req.captain);
};

// logout captain
export const logoutCaptain = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  await BlacklistToken.create({ token });
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out successfuly" });
};
