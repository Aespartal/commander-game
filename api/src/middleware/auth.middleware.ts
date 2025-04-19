import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";
import { User } from "../models/user.model";

export interface JwtPayload extends Partial<User> {
  iat?: number;
  exp?: number;
}

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "No autorizado: Token no proporcionado" });
    return;
  }

  const decoded = verifyToken(token);

  if (!decoded) {
    res.status(403).json({ message: "Token inválido" });
    return;
  }

  req.user = decoded as JwtPayload;

  next();
};
