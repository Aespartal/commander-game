import { Request, Response, NextFunction } from "express";

/**
 * A middleware to handle async errors in Express routes.
 * Wraps an async function and forwards any errors to the error handler.
 */
const asyncHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

export { asyncHandler };
