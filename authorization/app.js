import express from "express";
import {
  authMiddleware,
  loginMiddleware,
  requireOwnership,
  requireRole,
} from "./middleware.js";
import { loginService } from "./loginService.js";

const app = express();
const port = 5000;

app.use(express.json());

app.post("/login", loginMiddleware, (req, res, next) => {
  const { email, password } = req.body;
  const token = loginService(email, password);
  res.json({ token: token });
});

app.get(
  "/profile/:userId",
  authMiddleware,
  requireRole("admin"),
  requireOwnership("userId"),
  (req, res, next) => {
    try {
      console.log("User: ", req.user);
      res.json({ msg: "Profile accessed.", user: req.user });
    } catch (err) {
      next(err);
    }
  }
);

app.use((err, req, res, next) => {
  res.status(err.statusCode).json({ Error: err.message });
});

app.listen(port, (req, res, next) => {
  console.log(`Request served on http://localhost:${port}`);
});
