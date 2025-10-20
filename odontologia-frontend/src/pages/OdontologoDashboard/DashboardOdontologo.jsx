import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import CitasDelDia from "./CitasDelDia";
import TimelineActividades from "./TimelineActividades";
import GraficoPaciente from "./GraficoPacientes";
import { getDashboard } from "../../services/odontologoService";

const DashboardOdontologo = () => {
  const [dashboardData, setDashboardData] = useState({
    citasDelDia: [],
    timeline: [],
    graficoPacientes: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDashboard();
        setDashboardData(data);
      } catch (error) {
        console.error("Error al cargar dashboard:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <div className="p-6 flex flex-col gap-6 overflow-auto">
          <CitasDelDia citas={dashboardData.citasDelDia} />
          <TimelineActividades actividades={dashboardData.timeline} />
          <GraficoPaciente data={dashboardData.graficoPacientes} />
        </div>
      </div>
    </div>
  );
};

export default DashboardOdontologo;
