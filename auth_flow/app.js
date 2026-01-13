import express from "express";
import { authMiddleware, loginMiddleware } from "./authMiddleware.js";
import { loginService } from "./loginService.js";

const app = express();
const port = 5000;

app.use(express.json());

//LOGIN PATH
app.post("/login", loginMiddleware, async (req, res, next) => {
  const { email, password } = req.body;
  const token = loginService(email, password);
  res.json({ token: token });
});

//PROTECTED ROUTE
app.get("/profile", authMiddleware, (req, res, next) => {
  res.json({
    message: "Protected Profile Stats",
    user: req.user,
  });
});

app.use((err, req, res, next) => {
  res.status(500).send("Internal Server Error.");
});

app.listen(port, (req, res) => {
  console.log(`Request going on http://localhost:${port}`);
});
