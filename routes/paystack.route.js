import { Router } from 'express';
const router = Router();
import PaystackController from '../controller/paystack.controller.js';



router.post('/paystack/initialize', PaystackController.initializePayment);
router.get('/paystack/verify/:reference', PaystackController.verifyPayment);

export default router;
