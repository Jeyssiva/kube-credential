import prisma from '../prisma/client';
import { computeHash } from '../utils/hash';
// import fetch from 'node-fetch';
import logger from '../utils/logger';

const ISSUANCE_URL = process.env.ISSUANCE_URL;

export async function verify(credential: any, workerId: string) {
  const hash = computeHash(credential);

  // 1) Check local DB
  const local = await prisma.verificationLog.findFirst({ where: { hash } });
  if (local) {
    return { found: true, source: 'local', record: local };
  }

  // 2) If not found locally and ISSUANCE_URL provided, call issuance service
  if (ISSUANCE_URL) {
    try {
      const url = `${ISSUANCE_URL.replace(/\/$/, '')}/api/issued/${hash}`;
      logger.info(`Issuance_URL:${url}`);
      const res = await fetch(url);
      if (res.ok) {
        const responseData = await res.json();
        const {found, data} = responseData;

        if(found) {
           // Log verification
          await prisma.verificationLog.create({
            data: {
              hash,
              payload: JSON.stringify(credential),
              verifiedAt: new Date(),
              workerId,
              result: 'verified'
            }
          });
          return { found: true, source: 'issuance', record: data };
        } 
          return { ...data, source: 'verification'}
      }
    } catch (err) {
        logger.error("Internal Issue from verification- Issuance Server", err as any);
        return { found: false, error: err as any}
    }
  }

  return { found: false };
}
