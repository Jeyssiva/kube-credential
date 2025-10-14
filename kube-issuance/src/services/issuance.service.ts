import prisma from '../prisma/client';
import { computeHash } from '../utils/hash';

export async function issue(credential: any, workerId: string) {
  const hash = computeHash(credential);
  const existing = await prisma.credential.findUnique({ where: { hash } });

  // const findMany = await prisma.credential.findMany();
  // console.log(findMany)
  if (existing) {
    return { alreadyIssued: true, credential: existing };
  }

  const created = await prisma.credential.create({
    data: {
      title: credential.title,
      subject: credential.subject,
      payload: JSON.stringify(credential),
      hash,
      issuedBy: credential.issuedBy || 'Kube Credential Issuer',
      expiryDate: credential.expiryDate ? new Date(credential.expiryDate) : null,
      workerId
    }
  });

  return { alreadyIssued: false, credential: created };
}