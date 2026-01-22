import { NextFunction, Request, Response } from 'express';

interface AppError extends Error {
  status?: number;
}

export const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log(err, req.ip, req.originalUrl);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
  });
  next();
};
