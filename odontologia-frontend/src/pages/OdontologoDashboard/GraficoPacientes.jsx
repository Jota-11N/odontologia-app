// src/pages/OdontologoDashboard/GraficoPaciente.jsx
import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const GraficoPaciente = ({ data }) => {
  const chartData = {
    labels: data.map((item) => item.fecha),
    datasets: [
      {
        label: "Pacientes atendidos",
        data: data.map((item) => item.cantidad),
        backgroundColor: "rgba(59, 130, 246, 0.7)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Pacientes últimos 30 días" },
    },
  };

  return (
    <div className="bg-white shadow rounded p-4">
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default GraficoPaciente;
