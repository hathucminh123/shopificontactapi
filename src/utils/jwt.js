import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "supersecretkey"; // set in .env
const EXPIRES_IN = "7d"; // 7 days

export const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, SECRET);
  } catch (err) {
    return null;
  }
};
export const authMiddleware = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ error: "Missing token" });

  const token = header.split(" ")[1];
  const decoded = verifyToken(token);

  if (!decoded) return res.status(403).json({ error: "Invalid token" });

  req.user = decoded;
  next();
};
