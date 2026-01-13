import express from "express";
import { dataChecker } from "./middleware.js";

const app = express();
const port = 3000;

app.get("/", dataChecker, (req, res) => {
  res.send(req.cleanedData);
});

app.listen(port, () => {
  console.log(
    `Request is going on http://localhost:${port}/?name=Harsh&age=22`
  );
});

// Question - 4: Incomplete (Need to fix it without using multiple if else) Edit: Fixed inside the middleware

// app.get("/", (req, res) => {
//   const query = Object.keys(req.query);

//   if (query.length !== 2) {
//     return res.status(400).send("Only two parameters are allowed.");
//   }

//   if (!query.includes("name") || !query.includes("age")) {
//     return res
//       .status(400)
//       .send("Only name and age are allowed as query parameters.");
//   }
//   const { name, age } = req.query;

//   if (typeof name !== "string" || name.trim() === "") {
//     return res.status(400).send("Name query can't be empty.");
//   }
//   const ageNumber = Number(age);
//   if (!Number.isInteger(ageNumber) || ageNumber <= 0) {
//     return res.status(400).send("Age can't be less than 0.");
//   }
//   return res.send({
//     name,
//     age: ageNumber,
//   });
// });
