import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import IssuePage from './pages/issuePage';
import VerifyPage from './pages/verifyPage';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';

export default function App() {
  return (
    <BrowserRouter>
    <Container>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              {'Kube Credential'}
            </Typography>
            <Button color="inherit" component={Link} to="/issue">Issue</Button>
            <Button color="inherit" component={Link} to="/verify">Verify</Button>
          </Toolbar>
        </AppBar>
        <Container>
          <Routes>
            <Route path="/" element={<IssuePage />} />
            <Route path="/issue" element={<IssuePage />} />
            <Route path="/verify" element={<VerifyPage />} />
          </Routes>
        </Container>
      </Container>
    </BrowserRouter>
  );
}
