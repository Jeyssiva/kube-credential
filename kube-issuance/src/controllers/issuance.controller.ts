import { Request, Response } from 'express';
import * as issuanceService from '../services/issuance.service';
import logger from '../utils/logger';
import prisma from '../prisma/client';

const WORKER_ID = process.env.WORKER_ID || 'issuance-worker';

export async function issueCredential(req: Request, res: Response) {
  try {
    const payload = req.body;
    if (!payload || !payload.title || !payload.subject) {
      return res.status(400).json({ message: 'Invalid payload. Require title and subject.' });
    }

    const result = await issuanceService.issue(payload, WORKER_ID);

    if (result.alreadyIssued) {
      logger.info(`${WORKER_ID} - Attempt to re-issue credential (hash=${result.credential.hash})`);
      return res.status(409).json({
        message: 'Credential already issued',
        issuedBy: `credential issued by ${result.credential.workerId}`,
        credential: {
          id: result.credential.id,
          hash: result.credential.hash,
          issuedAt: result.credential.issuedAt
        }
      });
    }

    logger.info(`${WORKER_ID} - Issued credential (hash=${result.credential.hash})`);
    return res.status(201).json({
      message: 'Credential issued successfully',
      issuedBy: `credential issued by ${WORKER_ID}`,
      credential: {
        id: result.credential.id,
        hash: result.credential.hash,
        issuedAt: result.credential.issuedAt
      }
    });
  } catch (err) {
    logger.error('Issue controller error', err as any);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

export async function issuedCredential(req: Request, res: Response) {
  try {
    const {hash} = req.params;
    const findHash = await prisma.credential.findUnique({
      where : {
        hash
      }
    })

    if(!findHash) {
      logger.error(`${WORKER_ID} - Credential Not Found`)
      return res.status(200).json({found: false, message: 'Credential Not Found'})
    }

    logger.info(`${WORKER_ID}-Credential Verified by Verification Worker`)
    return res.status(200).json({found: true, data: findHash })

  } catch(err) {
    logger.error('Issued Credential Error', err as any);
    return res.status(500).json({message: 'Internal Server Error'})
  }
}