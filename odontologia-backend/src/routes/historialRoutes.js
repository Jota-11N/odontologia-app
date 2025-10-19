// src/routes/historialRoutes.js
import express from 'express';
import { getHistorial, crearHistorial } from '../controllers/historialController.js';

const router = express.Router();

router.get('/', getHistorial);
router.post('/', crearHistorial);

export default router;
