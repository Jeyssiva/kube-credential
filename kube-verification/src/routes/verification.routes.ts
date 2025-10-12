import { Router } from 'express';
import { verifyCredential } from '../controllers/verification.controller';
const router = Router();
router.post('/verify', verifyCredential);
router.get('/hello', (req, res) => res.json({ message: 'verification ok' }));
export default router;