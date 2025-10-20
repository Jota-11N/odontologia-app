import prisma from "../utils/prisma.js";

export const getDashboardData = async (req, res) => {
  try {
    const odontologoId = req.user.id_usu; // viene del token
    console.log("Usuario desde JWT:", req.user);
    console.log("odontologoId usado:", odontologoId);

    // 🔹 Citas del día
    const today = new Date();
    today.setHours(0,0,0,0); // inicio del día
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const citasDia = await prisma.cita.findMany({
      where: {
        odontologo: { id_usu: odontologoId },
        fec_cit: { gte: today, lt: tomorrow },
      },
      include: { paciente: true },
    });

    // 🔹 Últimas atenciones
    const ultimasAtenciones = await prisma.cita.findMany({
      where: {
        odontologo: { id_usu: odontologoId },
        est_cit: "Atendido",
      },
      orderBy: { fec_cit: "desc" },
      take: 5,
      include: { paciente: true },
    });

    // 🔹 Pacientes últimos 30 días
    const fecha30dias = new Date();
    fecha30dias.setDate(fecha30dias.getDate() - 30);

    const pacientes30dias = await prisma.cita.findMany({
      where: {
        odontologo: { id_usu: odontologoId },
        fec_cit: { gte: fecha30dias },
      },
      include: { paciente: true },
    });

    res.json({ 
      citasDelDia: citasDia, 
      timeline: ultimasAtenciones, 
      graficoPacientes: pacientes30dias 
    });

  } catch (err) {
    console.error("ERROR BACKEND DASHBOARD:", err);
    res.status(500).json({ message: "Error al cargar dashboard" });
  }
};
