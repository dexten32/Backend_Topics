import jwt from "jsonwebtoken";

const jwt_secret = "super-secret-key";

export function loginMiddleware(req, res, next) {
  const { email, password } = req.body;
  console.log("Login Middleware: ", { email, password });
  if (!email || !password) {
    return res.status(401).json({ Error: "Login credentials missing." });
  }

  if (typeof email !== "string" || typeof password !== "string") {
    return res
      .status(401)
      .json({ Error: "Datatype mismatch in login credentials." });
  }
  next();
}

export function authMiddleware(req, res, next) {
  console.log("Middleware HIT");
  const authHeader = req.headers.authorization;
  console.log("Auth Header: ", req.headers.authorization);

  if (!authHeader) {
    return res.status(401).json({ Error: "Authorization details not exist." });
  }

  const [type, token] = authHeader.split(" ");
  if (type !== "Bearer" || !token) {
    return res.status(401).json({ Error: "Token is invalid." });
  }

  try {
    const decode = jwt.verify(token, jwt_secret);
    req.user = decode;
  } catch (err) {
    return res.status(401).json({ Error: "Token Can't be verified." });
  }

  next();
}
