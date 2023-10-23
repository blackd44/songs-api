import { NextFunction, Request, Response } from "express";

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);

  const resBody = {
    message: err.message,
    stack: err.stack,
  };

  console.error("Error:", resBody);
  res.json(resBody);
}
