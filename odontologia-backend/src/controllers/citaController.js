import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getCitas = async (req, res) => {
  const citas = await prisma.cita.findMany({ include: { paciente: true, odontologo: true } });
  res.json(citas);
};

export const crearCita = async (req, res) => {
  const { id_pac, id_odo, fec_cit, dur_min, mod_cita } = req.body;
  const cita = await prisma.cita.create({
    data: { id_pac, id_odo, fec_cit: new Date(fec_cit), dur_min, mod_cita }
  });
  res.json(cita);
};
