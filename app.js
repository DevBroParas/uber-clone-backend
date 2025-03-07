import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// rouotes import
import userRoutes from "./routes/user.routes.js";
import captainRoutes from "./routes/captain.routes.js";

// use routes
app.use("/api/user", userRoutes);
app.use("/api/captain", captainRoutes);

app.get("/", (req, res) => res.send("Hello World!"));

export default app;
