export function loginMiddleware(req, res, next) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(401).json({ error: "Credentials missing." });
  }

  if (typeof email !== "string" || typeof password !== "string") {
    return res.status(401).json({ error: "Credentials datatype mismatch." });
  }
  next();
}

export function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(403).json({ error: "Missing Authorization headers." });
  }
  const [type, token] = authHeader.split(" ");
  if (type != "Bearer" || !token) {
    return res.status(401).json({ error: "Invalid authorization format." });
  }

  if (token !== "fake-jwt-token-123") {
    return res.status(401).json({ error: "Invalid token." });
  }

  req.user = {
    id: 1,
    email: "test@test.com",
  };

  next();
}
