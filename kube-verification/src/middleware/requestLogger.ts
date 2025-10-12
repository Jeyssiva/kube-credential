import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';

export function requestLogger(req: Request, res: Response, next: NextFunction) {
  const workerId = process.env.WORKER_ID || 'verification-worker';
  logger.info(`${workerId} - ${req.method} ${req.path}`);
  res.setHeader('X-Worker-Id', workerId);
  next();
}