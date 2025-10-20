// src/pages/OdontologoDashboard/CitasDelDia.jsx
import React from "react";

const CitasDelDia = ({ citas }) => {
  return (
    <div className="bg-white shadow rounded p-4">
      <h2 className="font-bold text-lg mb-3">Citas del Día</h2>
      {citas.length === 0 ? (
        <p>No hay citas hoy</p>
      ) : (
        <ul>
          {citas.map((cita) => (
            <li key={cita.id} className="border-b py-2">
              <p className="font-semibold">{cita.paciente}</p>
              <p>
                {cita.hora} - {cita.tipoAtencion}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CitasDelDia;
