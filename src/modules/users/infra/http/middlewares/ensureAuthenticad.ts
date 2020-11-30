import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import AppError from '@shared/errors/AppError';
import authConfig from '@config/auth';

interface TokenPayload {
  iat: number;
  expiresIn: number;
  sub: string;
  role_id: string;
}
export default function ensureAuthenticad(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new AppError('JWT token is missing', 401);
  }
  const [, token] = authorization.split(' ');

  try {
    const decoded = verify(token, authConfig.jwt.secret);
    const { sub, role_id } = decoded as TokenPayload;
    req.user = {
      id: sub,
      role_id,
    };

    next();
  } catch (error) {
    throw new AppError('Invalid JWT token', 401);
  }
}
