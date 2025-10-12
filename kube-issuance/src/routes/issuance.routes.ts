import { Router } from 'express';
import { issueCredential, issuedCredential } from '../controllers/issuance.controller';

const router = Router();

router.get('/hello', (req,res) => {
    return res.json({message: 'Hello world'})
})

router.post('/issue', issueCredential);
router.get('/issued/:hash', issuedCredential)

export default router;