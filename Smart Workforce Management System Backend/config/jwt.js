const JWT_secret = process.env.JWT_SECRET;

if (!JWT_secret) {
  throw new Error("JWT_SECRET is not configured");
}

module.exports = JWT_secret;
