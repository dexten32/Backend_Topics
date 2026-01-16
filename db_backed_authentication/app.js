import express from "express";
import { loginService } from "./services/loginServices.js";
import {
  loginMiddleware,
  authMiddleware,
} from "./middleware/authMiddleware.js";
import {
  requireOwnership,
  requireRole,
} from "./middleware/authorizationMiddleware.js";
import { signupService } from "./services/auth.services.js";

const app = express();
const port = 5000;

app.use(express.json());

app.post("/signup", async (req, res, next) => {
  console.log("Request Password: ", req.body.password);
  const { email, password, role } = req.body;
  console.log("input password: ", { password });
  await signupService(email, password, role);
  res.json({ message: "User Created Successfully." });
});

app.post("/login", loginMiddleware, async (req, res, next) => {
  const { email, password } = req.body;
  const token = await loginService(email, password);
  console.log(token);
  res.json({ token: token });
});

app.get(
  "/profile/:id",
  authMiddleware,
  requireRole("admin"),
  requireOwnership("id"),
  (req, res, next) => {
    res.json({ message: "Profile Accessed.", user: req.user });
  }
);

app.use((err, req, res, next) => {
  res.json({ Message: err.message, StatusCode: err.StatusCode });
});

app.listen(port, (req, res, next) => {
  console.log(`Request serving on http://localhost:${port}`);
});
