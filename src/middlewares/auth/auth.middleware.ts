import { Request, Response, NextFunction } from "express";
import { ForbiddenError, UnauthorizedError } from "../../errors/errors";
import { verifyToken } from "../../utils/jwt/jwt";
import { SessionInfos } from "../../type";
import { UserService } from "../../internal/users/service/user.service";

declare global {
  namespace Express {
    interface Request {
      user?: SessionInfos;
    }
  }
}

export async function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const userService = new UserService();
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthorizedError("Token não fornecido");
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = await verifyToken(token);
    const user = await userService.getByCPF(decoded.cpf)
    req.user = {id: user.id};
    next();
  } catch (error) {
    throw new ForbiddenError("Token inválido ou expirado");
  }
}

