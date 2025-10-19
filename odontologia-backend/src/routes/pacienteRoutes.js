import express from 'express';
import { getPacientes, crearPaciente } from '../controllers/pacienteController.js';
const router = express.Router();

router.get('/', getPacientes);
router.post('/', crearPaciente);

export default router;
