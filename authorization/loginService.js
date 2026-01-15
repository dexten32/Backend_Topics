import jwt from "jsonwebtoken";
import { AppError } from "./appError.js";

const jwt_secret = "super-secret-key";

export function loginService(email, password) {
  if (email !== "test@test.com" || password !== "password") {
    throw new AppError("Login Credentials Mismatch", 401);
  }

  const payload = {
    userId: 1,
    email,
    role: "admin",
  };
  const token = jwt.sign(payload, jwt_secret, {
    expiresIn: "15m",
  });

  return token;
}
