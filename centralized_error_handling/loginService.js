import jwt from "jsonwebtoken";
import { AppError } from "./appError.js";

const jwt_secret = "super-secret-key";

export function loginService(email, password) {
  console.log("Email: ", email);
  console.log("Password: ", password);
  if (email !== "test@test.com" || password !== "password") {
    throw new AppError("Invalid Credentials", 401);
  }
  const payload = {
    userId: 1,
    email,
    role: "user",
  };
  const token = jwt.sign(payload, jwt_secret, {
    expiresIn: "15m",
  });
  console.log("token: ", token);
  return token;
}
