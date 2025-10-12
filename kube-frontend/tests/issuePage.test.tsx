import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import * as api from '../src/api/credentialApi';
import IssuePage from '../src/pages/issuePage';
import { test, expect, vi } from 'vitest'; // ✅ add this if globals not enabled

vi.spyOn(api, 'issueCredential').mockImplementation(async (payload) => ({
  message: 'OK',
  issuedBy: 'credential issued by worker-test',
  credential: { hash: 'abc' },
}));

test('issue page submits and shows result', async () => {
  render(<IssuePage />);
  fireEvent.change(screen.getByLabelText(/Title/i), { target: { value: 'Test Cert' } });
  fireEvent.change(screen.getByLabelText(/Subject/i), { target: { value: 'alice@example.com' } });
  fireEvent.click(screen.getByRole('button', { name: /Issue Credential/i }));

  await waitFor(() =>
    expect(screen.getByText(/credential issued by worker-test/i)).toBeInTheDocument()
  );
});
