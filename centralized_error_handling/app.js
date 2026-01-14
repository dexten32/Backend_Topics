import express from "express";
import { loginService } from "./loginService.js";
import { authMiddleware, loginMiddleware } from "./middleware.js";

const app = express();
const port = 5000;
app.use(express.json());

app.post("/login", loginMiddleware, (req, res, next) => {
  const { email, password } = req.body;
  console.log({ email, password });
  const token = loginService(email, password);
  res.json({ token: token });
});

app.get("/profile", authMiddleware, (req, res, next) => {
  res.json({ msg: "Profile accessed.", user: req.user });
});



app.use((err, req, res, next) => {
  console.log("Status Code: ", err.statusCode);
  if (err.statusCode) {
    res.status(err.statusCode).json({ Message: err.message });
  } else {
    res.status(500).json({ Message: "Something Went wrong" });
  }
});

app.listen(port, (req, res) => {
  console.log(`Request served on server http://localhost:${port}`);
});
