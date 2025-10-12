import React from 'react';
import { Container, Card, CardContent, Typography, Alert, CircularProgress } from '@mui/material';
import CredentialForm from '../components/credentialForm';
import { verifyCredential } from '../api/credentialAPI';

export default function VerifyPage() {
  const [loading, setLoading] = React.useState(false);
  const [result, setResult] = React.useState<any>(null);
  const [error, setError] = React.useState<string | null>(null);

  const handleVerify = async (payload: any) => {
    setLoading(true);
    setResult(null);
    setError(null);
    try {
      const res = await verifyCredential(payload);
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
            Verify Credential
          </Typography>

          <CredentialForm onSubmit={handleVerify} submitLabel={loading ? 'Verifying...' : 'Verify Credential'} disabled={loading} />

          {loading && <CircularProgress sx={{ mt: 2 }} />}

          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}

          {result && (
            result.valid ? (
              <Alert severity="success" sx={{ mt: 2 }}>
                <div>✅ Credential is valid</div>
                <div>{result.worker}</div>
                <div>verifiedAt: {result.verifiedAt}</div>
              </Alert>
            ) : (
              <Alert severity="warning" sx={{ mt: 2 }}>
                ❌ Not found or invalid
              </Alert>
            )
          )}
        </CardContent>
      </Card>
    </Container>
  );
}
