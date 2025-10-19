// src/controllers/historialController.js
import prisma from '../utils/prisma.js';

// Obtener todos los historiales
export const getHistorial = async (req, res) => {
  try {
    const historial = await prisma.historial.findMany({
      include: {
        paciente: true,
        odontologo: true,
      },
    });
    res.json(historial);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener el historial' });
  }
};

// Crear un historial
export const crearHistorial = async (req, res) => {
  try {
    const { id_pac, id_odo, des_his, fec_eve, dia_nue } = req.body;
    const historial = await prisma.historial.create({
      data: { id_pac, id_odo, des_his, fec_eve, dia_nue },
    });
    res.status(201).json(historial);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear el historial' });
  }
};
