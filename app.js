import express from "express";
import router from "./routes/user.routes.js";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", router);

app.get("/", (req, res) => res.send("Hello World!"));

export default app;
