import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt.js";
import prisma from "../utils/prisma.js";
import { OAuth2Client } from "google-auth-library";

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

    res.json({ token, user: { id_usu: user.id_usu, email: user.cor_usu, rol: rol.nom_rol } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

// Login con Google
export const googleLogin = async (req, res) => {
  const { tokenId } = req.body;

  try {
    const ticket = await client.verifyIdToken({ idToken: tokenId, audience: process.env.GOOGLE_CLIENT_ID });
    const payload = ticket.getPayload();

    // Validar dominio UNAJMA
    if (!payload.email.endsWith("@unajma.edu.pe")) {
      return res.status(400).json({ message: "Solo correos @unajma.edu.pe permitidos" });
    }

    // Verificar si el usuario ya existe
    let user = await prisma.usuario.findUnique({ where: { cor_usu: payload.email } });

    // Si no existe, crear usuario
    if (!user) {
      const rolEstudiante = await prisma.rol.findFirst({ where: { nom_rol: "paciente" } });
      user = await prisma.usuario.create({
        data: {
          nom_usu: payload.given_name,
          ape_usu: payload.family_name,
          cor_usu: payload.email,
          con_usu: "", // vacía porque es login con Google
          id_rol: rolEstudiante.id_rol,
          est_usu: true,
        },
      });
    }

    const rol = await prisma.rol.findUnique({ where: { id_rol: user.id_rol } });
    const token = generateToken({ id_usu: user.id_usu, rol: rol.nom_rol });

    res.json({ token, user: { id_usu: user.id_usu, email: user.cor_usu, rol: rol.nom_rol } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error con autenticación de Google" });
  }
};
