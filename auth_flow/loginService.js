export function loginService(email, password) {
  if (email !== "test@test.com" || password !== "password") {
    return res.status(401).json({ error: "Invalid Credentials" });
  }

  return "fake-jwt-token-123";
}
