// src/pages/OdontologoDashboard/UltimasAtenciones.jsx
import React from "react";

const UltimasAtenciones = ({ atenciones }) => {
  return (
    <div className="bg-white p-4 rounded shadow flex-1">
      <h2 className="text-lg font-semibold mb-2">Últimas atenciones</h2>
      {atenciones.length === 0 && <p>No hay atenciones recientes.</p>}
      {atenciones.map((a) => (
        <div key={a.id} className="border-b py-1">
          <p className="font-medium">{a.paciente}</p>
          <p className="text-sm">{a.fecha} - {a.tipo}</p>
        </div>
      ))}
    </div>
  );
};

export default UltimasAtenciones;
