// import jwt from "jsonwebtoken";
import express from "express";
import { authMiddleware, loginMiddleware } from "./authMiddleware.js";
import { loginService } from "./loginService.js";

// const jwt_secret = "super-secret-key";
const app = express();
const port = 5000;
app.use(express.json());

app.post("/login", loginMiddleware, async (req, res, next) => {
  const { email, password } = req.body;
  console.log({ email, password });
  const token = loginService(email, password);
  res.json({ token: token });
});

app.get("/profile", authMiddleware, (req, res, next) => {
  res.json({ msg: "User Data Extracted.", user: req.user });
});

app.get("/debug-headers", (req, res) => {
  console.log("DEBUG HEADERS:", req.headers);
  res.json(req.headers);
});

app.listen(port, (req, res, next) => {
  console.log(`Request served on http://localhost:${port}`);
});
