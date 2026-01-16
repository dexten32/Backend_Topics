import bcrypt from "bcrypt";
import { db } from "../db/database.js";
import { AppError } from "../utils/appError.js";

const salts_rounds = 10;

export async function signupService(email, password, role = "user") {
  const existingUser = await new Promise((resolve, reject) => {
    db.get("Select id from users where email = ?", [email], (err, user) => {
      if (err) reject(err);
      resolve(user);
    });
  });
  if (existingUser) {
    throw new AppError("User already exists.", 409);
  }
  const hashedpassword = await bcrypt.hash(password, salts_rounds);
  console.log("Hashed Password: ", hashedpassword);

  await new Promise((resolve, reject) => {
    db.run(
      "Insert into users (email, password_hash, role) values (?, ?, ?)",
      [email, hashedpassword, role],
      function (err) {
        if (err) reject(err);
        resolve();
      }
    );
  });
  return { message: "User created successfully." };
}
