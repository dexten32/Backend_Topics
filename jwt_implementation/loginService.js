import jwt from "jsonwebtoken";

const jwt_secret = "super-secret-key";

export function loginService(email, password) {
  if (email !== "test@test.com" || password !== "password") {
    return res
      .status(401)
      .json({
        Error:
          "Invalid Credentials, Please check the credentials and try again.",
      });
  }
  const payload = {
    userId: 1,
    email,
    role: "user",
  }

  const token = jwt.sign(payload, jwt_secret, {
    expiresIn: "15m",
  });
  return token;
}
