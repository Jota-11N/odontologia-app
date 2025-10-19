import axios from "axios";

const API_URL = "http://localhost:3001/api/odontologos";

export const getOdontologos = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const crearOdontologo = async (odontologo) => {
  const res = await axios.post(API_URL, odontologo);
  return res.data;
};
