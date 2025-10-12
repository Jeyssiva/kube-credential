import { CredentialPayload } from '../types/credential';

const ISSUANCE_BASE = import.meta.env.ISSUANCE_API_URL ?? 'http://localhost:3001/api';
const VERIFICATION_BASE = import.meta.env.VERIFICATION_API_URL ?? 'http://localhost:4001/api';

async function postJson(url: string, data: any) {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });

  const text = await res.text();
  try {
    const json = text ? JSON.parse(text) : {};
    if (!res.ok) throw { status: res.status, body: json };
    return json;
  } catch (e) {
    // Not JSON or parsing error
    if (!res.ok) throw { status: res.status, body: text };
    return text;
  }
}

export function issueCredential(payload: CredentialPayload) {
  return postJson(`${ISSUANCE_BASE}/issue`, payload);
}

export function verifyCredential(payload: CredentialPayload) {
  return postJson(`${VERIFICATION_BASE}/verify`, payload);
}
