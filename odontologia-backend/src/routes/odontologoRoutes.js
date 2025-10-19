// src/routes/odontologoRoutes.js
import express from 'express';
import { getOdontologos, crearOdontologo } from '../controllers/odontologoController.js';

const router = express.Router();

router.get('/', getOdontologos);
router.post('/', crearOdontologo);

export default router;
