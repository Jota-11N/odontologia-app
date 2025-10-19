import express from 'express';
import { getCitas, crearCita } from '../controllers/citaController.js';
const router = express.Router();

router.get('/', getCitas);
router.post('/', crearCita);

export default router;
