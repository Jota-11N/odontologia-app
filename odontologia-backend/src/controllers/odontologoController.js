// src/controllers/odontologoController.js
import prisma from '../utils/prisma.js';

// Obtener todos los odontólogos
export const getOdontologos = async (req, res) => {
  try {
    const odontologos = await prisma.odontologo.findMany({
      include: { usuario: true }
    });
    res.json(odontologos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener odontólogos' });
  }
};

// Crear un odontólogo
export const crearOdontologo = async (req, res) => {
  try {
    const { id_usu, esp_odo, tur_ate_odo } = req.body;

    const nuevoOdontologo = await prisma.odontologo.create({
      data: { id_usu, esp_odo, tur_ate_odo },
    });

    res.json(nuevoOdontologo);
  } catch (error) {
    console.error('Error al crear odontólogo:', error); // 👈 muy importante
    res.status(500).json({ message: 'Error al crear odontólogo' });
  }
};

