import express from 'express';
import { getWallet, depositFunds } from '../controllers/walletController.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/', protect, getWallet);
router.post('/deposit', protect, depositFunds);

export default router;