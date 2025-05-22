import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "AQUIBVEMACHAVEDEVCS";

export function generateToken(payload: object): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "14d" });
}

export function verifyToken(token: string): any | null {
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    return payload;
  } catch (err) {
    console.error("Token inválido:", err);
    return null;
  }
}

