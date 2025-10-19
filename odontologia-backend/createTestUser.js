import bcrypt from "bcrypt";
import prisma from "./src/utils/prisma.js"; // Ajusta la ruta si es necesario

const createUser = async () => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("12345678", salt); // Contraseña del usuario de prueba

    // Verificar si el rol "paciente" existe
    let rolPaciente = await prisma.rol.findFirst({ where: { nom_rol: "paciente" } });
    if (!rolPaciente) {
      rolPaciente = await prisma.rol.create({ data: { nom_rol: "paciente" } });
      console.log("Rol 'paciente' creado:", rolPaciente);
    }

    // Crear usuario
    const user = await prisma.usuario.create({
      data: {
        nom_usu: "Juan",
        ape_usu: "Perez",
        cor_usu: "juan.perez@unajma.edu.pe",
        con_usu: hashedPassword,
        id_rol: rolPaciente.id_rol,
        est_usu: true,
        tel_usu: "123456789",
        dni_usu: "12345678",
        esc_pro_usu: "Ingeniería",
      },
    });

    console.log("Usuario creado:", user);
    process.exit(0);
  } catch (err) {
    console.error("Error creando usuario:", err);
    process.exit(1);
  }
};

createUser();
