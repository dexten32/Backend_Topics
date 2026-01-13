import express from "express";
import userMiddleware from "./middleware.js";
import fetchingUser from "./helper.js";

const app = express();
const port = 3000;

app.get("/", userMiddleware, async (req, res, next) => {
  try {
    const user = await fetchingUser();
    res.json(user);
  } catch (err) {
    next(err);
  }
});

app.use((err, req, res, next) => {
  console.error(err.message);

  res.status(500).json({ error: err.message || "Something Went Wrong" });
});

app.listen(port, () => {
  console.log(`Request can be seen on http://localhost:${port}`);
});
