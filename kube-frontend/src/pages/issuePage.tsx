import React from 'react';
import { Container, Card, CardContent, Typography, Alert, CircularProgress } from '@mui/material';
import CredentialForm from '../components/credentialForm';
import { issueCredential } from '../api/credentialAPI';

export default function IssuePage() {
  const [loading, setLoading] = React.useState(false);
  const [result, setResult] = React.useState<any>(null);
  const [error, setError] = React.useState<string | null>(null);

  const handleIssue = async (payload: any) => {
    setLoading(true);
    setResult(null);
    setError(null);
    try {
      const res = await issueCredential(payload);
      setResult(res);
    } catch (err: any) {
      setError(err?.body?.message || err?.body || String(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Issue Credential
          </Typography>

          <CredentialForm onSubmit={handleIssue} submitLabel={loading ? 'Issuing...' : 'Issue Credential'} disabled={loading} />

          {loading && <CircularProgress sx={{ mt: 2 }} />}

          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}

          {result && (
            <Alert severity="success" sx={{ mt: 2 }}>
              <div><strong>{result.message ?? 'Issued'}</strong></div>
              <div>{result.issuedBy}</div>
              {result.credential && <div>hash: {result.credential.hash}</div>}
            </Alert>
          )}
        </CardContent>
      </Card>
    </Container>
  );
}