import { Router } from 'express';
import { generateResumePDF } from '../controllers/pdf.controller.js';

const router = Router();

router.post('/generate-pdf', generateResumePDF);

export default router;