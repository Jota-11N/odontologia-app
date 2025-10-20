// src/pages/OdontologoDashboard/TimelineActividades.jsx
import React from "react";

const TimelineActividades = ({ actividades }) => {
  return (
    <div className="bg-white shadow rounded p-4">
      <h2 className="font-bold text-lg mb-3">Próximas Actividades</h2>
      {actividades.length === 0 ? (
        <p>No hay actividades próximas</p>
      ) : (
        <ul className="flex gap-4 overflow-x-auto">
          {actividades.map((act) => (
            <li
              key={act.id}
              className="bg-blue-100 text-blue-900 px-3 py-2 rounded"
            >
              {act.fecha}: {act.descripcion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TimelineActividades;
