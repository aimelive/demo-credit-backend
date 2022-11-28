import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const generateToken = (id: string) => {
  const secret = process.env.JWT_TOKEN || "my-jwt-demo-credit=app-secret";
  // console.log(secret);
  return jwt.sign({ userId: id }, secret, {
    expiresIn: "24h",
  });
};

export function decodeToken(token: string): JwtPayload {
  const verify = jwt.verify(
    token,
    process.env.JWT_TOKEN || "my-jwt-demo-credit=app-secret"
  );
  return verify as JwtPayload;
}
