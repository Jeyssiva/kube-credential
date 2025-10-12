import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import VerifyPage from '../src/pages/verifyPage';
import * as api from '../src/api/credentialApi';
import { vi } from 'vitest';

vi.spyOn(api, 'verifyCredential').mockImplementation(async (_) => ({ valid: true, worker: 'verified by worker-test', verifiedAt: new Date().toISOString() }));

test('verify page submits and shows success', async () => {
  render(<VerifyPage />);
  fireEvent.change(screen.getByLabelText(/Title/i), { target: { value: 'Test Cert' } });
  fireEvent.change(screen.getByLabelText(/Subject/i), { target: { value: 'alice@example.com' } });
  fireEvent.click(screen.getByRole('button', { name: /Verify Credential/i }));

  await waitFor(() => expect(screen.getByText(/✅ Credential is valid/i)).toBeInTheDocument());
});
