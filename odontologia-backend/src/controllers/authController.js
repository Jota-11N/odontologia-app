// src/controllers/authController.js
import bcrypt from 'bcrypt';
import prisma from '../utils/prisma.js';
import { generateToken } from '../utils/jwt.js';
import { OAuth2Client } from 'google-auth-library';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Login clásico
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.usuario.findUnique({ where: { cor_usu: email } });
    if (!user) return res.status(400).json({ message: "Usuario no encontrado" });

    const validPassword = await bcrypt.compare(password, user.con_usu);
    if (!validPassword) return res.status(400).json({ message: "Contraseña incorrecta" });

    const rol = await prisma.rol.findUnique({ where: { id_rol: user.id_rol } });
    const token = generateToken({ id_usu: user.id_usu, rol: rol.nom_rol });

    res.json({
      token,
      usuario: {
        id_usu: user.id_usu,
        nom_usu: user.nom_usu,
        ape_usu: user.ape_usu,
        cor_usu: user.cor_usu,
        rol: { id_rol: rol.id_rol, nom_rol: rol.nom_rol },
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

// Login con Google
export const googleLogin = async (req, res) => {
  const { tokenId } = req.body;

  try {
    // Verificar token con Google
    const ticket = await client.verifyIdToken({
      idToken: tokenId,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    // Validar correo institucional
    if (!payload.email.endsWith('@unajma.edu.pe')) {
      return res.status(401).json({ message: 'Solo correos institucionales permitidos' });
    }

    // Verificar si el usuario ya existe
    let usuario = await prisma.usuario.findUnique({
      where: { cor_usu: payload.email },
    });

    // Crear usuario si no existe
    if (!usuario) {
      const rolPaciente = await prisma.rol.findFirst({ where: { nom_rol: 'paciente' } });
      usuario = await prisma.usuario.create({
        data: {
          nom_usu: payload.given_name || 'Nombre',
          ape_usu: payload.family_name || 'Apellido',
          cor_usu: payload.email,
          con_usu: '', // vacío porque es login con Google
          id_rol: rolPaciente.id_rol,
          tel_usu: '',
          est_usu: 'Activo',
          dni_usu: `G${Math.floor(Math.random() * 10000000)}`,
        },
      });
    }

    // Generar JWT
    const token = generateToken({ id_usu: usuario.id_usu, rol: usuario.id_rol });

    // Devolver datos al frontend de manera consistente
    res.json({
      token,
      usuario: {
        id_usu: usuario.id_usu,
        nom_usu: usuario.nom_usu,
        ape_usu: usuario.ape_usu,
        cor_usu: usuario.cor_usu,
        rol: {
          id_rol: usuario.id_rol,
          nom_rol: (await prisma.rol.findUnique({ where: { id_rol: usuario.id_rol } })).nom_rol,
        },
      },
    });
  } catch (error) {
    console.error('Error login Google:', error);
    res.status(500).json({ message: 'Error con autenticación de Google', error });
  }
};
