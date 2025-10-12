import React from 'react';
import { TextField, Button, Stack } from '@mui/material';
import { CredentialPayload } from '../types/credential';

type Props = {
  initial?: Partial<CredentialPayload>;
  onSubmit: (data: CredentialPayload) => void;
  submitLabel?: string;
  disabled?: boolean;
};

export default function CredentialForm({ initial = {}, onSubmit, submitLabel = 'Submit', disabled = false }: Props) {
  const [title, setTitle] = React.useState(initial.title ?? '');
  const [subject, setSubject] = React.useState(initial.subject ?? '');
  const [expiryDate, setExpiryDate] = React.useState(initial.expiryDate ?? '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title: title.trim(), subject: subject.trim(), expiryDate: expiryDate ? expiryDate : undefined });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2} sx={{ width: 1 }}>
        <TextField label="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <TextField label="Subject (email or id)" value={subject} onChange={(e) => setSubject(e.target.value)} required />
        <TextField
          label="Expiry Date (optional)"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={expiryDate}
          onChange={(e) => setExpiryDate(e.target.value)}
        />
        <Button type="submit" variant="contained" disabled={disabled}>
          {submitLabel}
        </Button>
      </Stack>
    </form>
  );
}