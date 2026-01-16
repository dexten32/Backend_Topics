import jwt from "jsonwebtoken";
import { AppError } from "../utils/appError.js";
import bcrypt from "bcrypt";
import { db } from "../db/database.js";

const jwt_secret = "super-secret-key";

export async function loginService(email, password) {
  const user = await new Promise((resolve, reject) => {
    db.get(
      "Select id, email, password_hash, role from users where email = ?",
      [email],
      (err, row) => {
        if (err) reject(err);
        resolve(row);
      }
    );
  });
  if (user === undefined) {
    throw new AppError("No user with that email exist, Try signing in.", 401);
  }

  const comparedPassword = await bcrypt.compare(password, user.password_hash);

  if (!comparedPassword) {
    throw new AppError("Credentials Mismatch.", 401);
  }
  const payload = {
    id: user.id,
    email,
    role: user.role,
  };

  const token = jwt.sign(payload, jwt_secret, {
    expiresIn: "15m",
  });
  return token;
}
