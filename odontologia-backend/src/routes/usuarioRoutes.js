import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

import express from 'express';
import { getUsuarios, crearUsuario, login } from '../controllers/usuarioController.js';
const router = express.Router();

router.get('/', getUsuarios);
router.post('/', crearUsuario);
router.post('/login', login);
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await prisma.usuario.delete({
      where: { id_usu: Number(id) }
    });
    res.json({ message: 'Usuario eliminado', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar usuario' });
  }
});

export default router;
