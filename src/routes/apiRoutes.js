import express from 'express';
import { getLinkQr, sendMessage } from '../controllers/whatsappController.js';

const router = express.Router();

router.get('/link-qr', getLinkQr);
router.post('/api/send-message', sendMessage);

export default router;
