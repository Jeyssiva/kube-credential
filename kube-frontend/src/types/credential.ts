export interface CredentialPayload {
    title: string;
    subject: string;
    expiryDate?: string;
    [key: string]: any;
  }  