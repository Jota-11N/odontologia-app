import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL + "/paciente";

export const getPacientes = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const createPaciente = async (paciente) => {
  const res = await axios.post(API_URL, paciente);
  return res.data;
};

export const updatePaciente = async (id, paciente) => {
  const res = await axios.put(`${API_URL}/${id}`, paciente);
  return res.data;
};

export const deletePaciente = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};
