import { Request, Response } from 'express';
import * as verificationService from '../services/verification.service';
import logger from '../utils/logger';
import { computeHash } from '../utils/hash';

const WORKER_ID = process.env.WORKER_ID || 'verification-worker';

export async function verifyCredential(req: Request, res: Response) {
  const payload = req.body;
  if (!payload || !payload.title || !payload.subject) {
    return res.status(400).json({ message: 'Invalid payload. Require title and subject.' });
  }

  const result = await verificationService.verify(payload, WORKER_ID);

  if (result.found) {
    const timestamp = new Date().toISOString();
    logger.info(`${WORKER_ID} - Verified credential (hash=${computeHash(payload)})`);
    return res.status(200).json({
      valid: true,
      worker: `verified by ${WORKER_ID}`,
      verifiedAt: timestamp,
      source: result.source,
      details: result.record
    });
  }

  return res.status(404).json({ valid: false, message: 'Credential not found' });
}