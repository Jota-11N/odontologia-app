// src/routes/authRoutes.js
import express from 'express';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();
const prisma = new PrismaClient();

// Login con Google
router.post('/google', async (req, res) => {
  try {
    const { tokenId } = req.body;

    // Decodificar token de Google
    const base64Payload = tokenId.split('.')[1];
    const payload = JSON.parse(Buffer.from(base64Payload, 'base64').toString());

    const email = payload.email;
    if (!email.endsWith('@unajma.edu.pe')) {
      return res.status(401).json({ message: 'Solo correos institucionales permitidos' });
    }

    // Verificar si el usuario ya existe
    let usuario = await prisma.usuario.findUnique({ where: { cor_usu: email } });
    if (!usuario) {
  usuario = await prisma.usuario.create({
    data: {
      nom_usu: (payload.given_name || 'Nombre').substring(0, 20),
      ape_usu: (payload.family_name || 'Apellido').substring(0, 20),
      cor_usu: email,
      con_usu: 'google_login',
      id_rol: 3, // Paciente
      tel_usu: '', // o null si la DB lo permite
      est_usu: 'Activo',
      dni_usu: `G${Math.floor(Math.random() * 10000000)}`, // 8 caracteres máximo
    },
  });
}

    // Generar JWT
    const token = jwt.sign(
      { id_usu: usuario.id_usu, id_rol: usuario.id_rol },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

    res.json({ token, usuario });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al iniciar sesión con Google', error });
  }
});

export default router;
