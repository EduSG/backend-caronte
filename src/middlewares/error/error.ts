import { ErrorRequestHandler } from 'express';
import {
  DuplicateError,
  ForbiddenError,
  NotFoundError,
  UnauthorizedError,
  ValidationError
} from '../../errors/errors';
import { ZodError } from 'zod';


export const errorMiddleware: ErrorRequestHandler = (
  error,
  req,
  res,
  next
) => {
  console.error(error);

  if (error instanceof ZodError) {
    const messages = error.errors.map(e => `${e.path.join('.')}: ${e.message}`);
    error = new ValidationError(messages.join('; '));
  }

  if (error instanceof ValidationError) {
    res.status(422).json({ message: error.message });
    return;
  }
  if (error instanceof DuplicateError) {
    res.status(409).json({ message: error.message });
    return;
  }
  if (error instanceof UnauthorizedError) {
    res.status(401).json({ message: error.message });
    return;
  }
  if (error instanceof NotFoundError) {
    res.status(404).json({ message: error.message });
    return;
  }
  if (error instanceof ForbiddenError) {
    res.status(403).json({ message: error.message });
    return;
  }

  res.status(500).json({ message: 'Erro interno no servidor' });
};
