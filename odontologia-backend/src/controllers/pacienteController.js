import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getPacientes = async (req, res) => {
  const pacientes = await prisma.paciente.findMany({ include: { usuario: true } });
  res.json(pacientes);
};

export const crearPaciente = async (req, res) => {
  const { id_usu, fec_reg_pac, eda_pac, tip_ate_pac } = req.body;
  const paciente = await prisma.paciente.create({
    data: { id_usu, fec_reg_pac: new Date(fec_reg_pac), eda_pac, tip_ate_pac }
  });
  res.json(paciente);
};
