// src/components/Odontologos/OdontologoForm.jsx
import React, { useState } from "react";

export default function OdontologoForm({ onAdd }) {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    especialidad: "",
    telefono: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.nombre || !formData.apellido || !formData.especialidad) {
      alert("Por favor, completa todos los campos obligatorios");
      return;
    }

    // Llamada mock para agregar a la tabla
    onAdd({ ...formData, id: Date.now() });
    setFormData({ nombre: "", apellido: "", especialidad: "", telefono: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        type="text"
        name="nombre"
        value={formData.nombre}
        onChange={handleChange}
        placeholder="Nombre"
        className="border p-2 rounded"
      />
      <input
        type="text"
        name="apellido"
        value={formData.apellido}
        onChange={handleChange}
        placeholder="Apellido"
        className="border p-2 rounded"
      />
      <input
        type="text"
        name="especialidad"
        value={formData.especialidad}
        onChange={handleChange}
        placeholder="Especialidad"
        className="border p-2 rounded"
      />
      <input
        type="text"
        name="telefono"
        value={formData.telefono}
        onChange={handleChange}
        placeholder="Teléfono"
        className="border p-2 rounded"
      />
      <button
        type="submit"
        className="bg-primary text-white p-2 rounded hover:bg-orange-700 transition"
      >
        Registrar
      </button>
    </form>
  );
}
