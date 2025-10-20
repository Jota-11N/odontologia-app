import axios from "axios";

const BASE_URL = "http://localhost:3001/api/odontologo";

// Obtener lista de odontólogos
export const getOdontologos = async () => {
  try {
    const res = await axios.get(`${BASE_URL}`);
    return res.data;
  } catch (error) {
    console.error("Error al obtener odontólogos:", error);
    throw error;
  }
};

// Crear nuevo odontólogo
export const crearOdontologo = async (data) => {
  try {
    const res = await axios.post(`${BASE_URL}`, data);
    return res.data;
  } catch (error) {
    console.error("Error al crear odontólogo:", error);
    throw error;
  }
};

// Obtener datos del dashboard del odontólogo
export const getDashboard = async () => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.get(`${BASE_URL}/dashboard`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
  } catch (error) {
    console.error("Error al obtener dashboard:", error);
    throw error;
  }
};
