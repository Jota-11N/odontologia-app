import React, { useState, useEffect } from "react";
import OdontologoList from "../components/Odontologos/OdontologoList";
import OdontologoForm from "../components/Odontologos/OdontologoForm";
import { getOdontologos, crearOdontologo } from "../services/odontologoService";

export default function OdontologosPage() {
  const [odontologos, setOdontologos] = useState([]);

  useEffect(() => {
    const fetchOdontologos = async () => {
      try {
        const data = await getOdontologos();
        setOdontologos(data);
      } catch (error) {
        console.error("Error al obtener odontólogos:", error);
      }
    };
    fetchOdontologos();
  }, []);

  const handleAddOdontologo = async (nuevo) => {
    try {
      const creado = await crearOdontologo(nuevo);
      setOdontologos([creado, ...odontologos]);
    } catch (error) {
      console.error("Error al crear odontólogo:", error);
    }
  };

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 bg-graybg min-h-screen">
      <div className="bg-white shadow-xl rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-secondary mb-4">Registrar Odontólogo</h2>
        <OdontologoForm onAdd={handleAddOdontologo} />
      </div>

      <div className="bg-white shadow-xl rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-primary mb-4">Lista de Odontólogos</h2>
        <OdontologoList odontologos={odontologos} />
      </div>
    </div>
  );
}
