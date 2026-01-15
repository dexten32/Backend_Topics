import jwt from "jsonwebtoken";
import { AppError } from "./appError.js";

const jwt_secret = "super-secret-key";

export function loginMiddleware(req, res, next) {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new AppError("Empty Credentials", 401);
  }
  if (typeof email !== "string" || typeof password !== "string") {
    throw new AppError("Datatype mismatch", 401);
  }
  next();
}

export function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError("Empty Header", 401);
  }
  const [type, token] = authHeader.split(" ");
  if (type !== "Bearer" || !token) {
    throw new AppError("Token is invalid", 401);
  }
  try {
    const decoded = jwt.verify(token, jwt_secret);
    req.user = decoded;
  } catch (err) {
    throw new AppError("Invalid token.", 401);
  }
  next();
}

export function requireRole(role) {
  return function (req, res, next) {
    console.log("role middleware hit.");
    const availableRole = req.user.role;
    console.log("availabel role: ", availableRole);
    if (availableRole !== role) {
      next(new AppError("Invalid Role. Access Denied", 403));
      return;
    }
    next();
  };
}

export function requireOwnership(userId) {
  return function (req, res, next) {
    console.log("ownership middleware hit.");
    console.log("Params: ", req.params);
    const param_id = req.params[userId];
    console.log("paramsId: ", param_id);
    const user_id = req.user.userId;
    console.log("userId: ", user_id);
    if (String(param_id) !== String(user_id)) {
      next(new AppError("Id Mismatch. Access Denied.", 403));
      return;
    }
    next();
  };
}
