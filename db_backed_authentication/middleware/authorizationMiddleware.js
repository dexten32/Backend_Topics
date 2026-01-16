import { AppError } from "../utils/appError.js";

export function requireRole(role) {
  return function (req, res, next) {
    const givenRole = req.user.role;
    if (givenRole !== role) {
      next(new AppError("Invalid Role, Access denied.", 403));
      return;
    }
    next();
  };
}

export function requireOwnership(id) {
  return function (req, res, next) {
    const params_id = req.params[id];
    console.log("Params_id: ", params_id);
    const user_id = req.user.id;
    console.log("User ID: ", user_id);

    if (String(user_id) !== String(params_id)) {
      next(new AppError("Ownership mismatch, access denied.", 403));
      return;
    }
    next();
  };
}
