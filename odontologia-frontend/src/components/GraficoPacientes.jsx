// src/components/GraficoPacientes.jsx
import React, { useEffect, useState } from "react";
import { getGraficoPacientes } from "../services/odontologoService"; // import correcto

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const GraficoPacientes = () => {
  const [graficoData, setGraficoData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getGraficoPacientes(); // obtiene datos del backend
        setGraficoData(data);
      } catch (err) {
        console.error("Error cargando gráfico:", err);
      }
    };
    fetchData();
  }, []);

  const data = {
    labels: graficoData.map((d) => d.dia),
    datasets: [
      {
        label: "Pacientes atendidos",
        data: graficoData.map((d) => d.cantidad),
        backgroundColor: "#2563EB", // azul oscuro
      },
    ],
  };

  return (
    <div className="bg-white shadow rounded-lg p-4 w-full">
      <h3 className="text-lg font-semibold mb-4 text-blue-700">Pacientes últimos 30 días</h3>
      <Bar data={data} />
    </div>
  );
};

export default GraficoPacientes;
