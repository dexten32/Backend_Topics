import fetchingUser from "./helper.js";

async function userMiddleware(req, res, next) {
  const { limit } = req.query;
  if (limit !== undefined && isNaN(Number(limit))) {
    return res.status(400).send("Invalid Datatype: limit must be a number.");
  }
  next();
}

export default userMiddleware;
