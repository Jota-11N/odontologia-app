import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { hashPassword, comparePassword } from '../utils/hash.js';
import dotenv from 'dotenv';
dotenv.config();

const prisma = new PrismaClient();

export const getUsuarios = async (req, res) => {
  const usuarios = await prisma.usuario.findMany({ include: { rol: true } });
  res.json(usuarios);
};

export const crearUsuario = async (req, res) => {
  const { nom_usu, ape_usu, dni_usu, cor_usu, con_usu, tel_usu, id_rol } = req.body;
  const passwordHash = await hashPassword(con_usu);

  const usuario = await prisma.usuario.create({
    data: { nom_usu, ape_usu, dni_usu, cor_usu, con_usu: passwordHash, tel_usu, id_rol }
  });
  res.json(usuario);
};

export const login = async (req, res) => {
  const { cor_usu, con_usu } = req.body;
  const user = await prisma.usuario.findUnique({ where: { cor_usu } });
  if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

  const isValid = await comparePassword(con_usu, user.con_usu);
  if (!isValid) return res.status(401).json({ message: 'Contraseña incorrecta' });

  const token = jwt.sign({ id_usu: user.id_usu, id_rol: user.id_rol }, process.env.JWT_SECRET, { expiresIn: '8h' });
  res.json({ token, usuario: user });
};
