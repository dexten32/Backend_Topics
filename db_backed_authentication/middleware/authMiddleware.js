import jwt from "jsonwebtoken";
import { AppError } from "../utils/appError.js";

const jwt_secret = "super-secret-key";

export function loginMiddleware(req, res, next) {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new AppError("Empty Credentials", 401);
  }
  if (typeof email !== "string" || typeof password !== "string") {
    throw new AppError("Credentials Datatype Mismatch.", 401);
  }
  next();
}

export function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError("Auth Header Empty.", 401);
  }

  const [type, token] = authHeader.split(" ");
  if (type !== "Bearer" || !token) {
    throw new AppError("Token invalid, Try logging in again.", 401);
  }
  try {
    const decode = jwt.verify(token, jwt_secret);
    req.user = decode;
  } catch (err) {
    throw new AppError("Invalid Token", 401);
  }
  next();
}
