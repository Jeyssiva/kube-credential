import crypto from 'crypto';

function stableStringify(obj: any): string {
  if (obj === null || typeof obj !== 'object') return JSON.stringify(obj);
  if (Array.isArray(obj)) return `[${obj.map(stableStringify).join(',')}]`;
  const keys = Object.keys(obj).sort();
  return `{${keys.map(k => `"${k}":${stableStringify(obj[k])}`).join(',')}}`;
}

export function computeHash(credential: any) {
  const canonical = {
    title: credential.title,
    subject: credential.subject,
    expiryDate: credential.expiryDate ?? null
  };
  const normalized = stableStringify(canonical);
  return crypto.createHash('sha256').update(normalized).digest('hex');
}