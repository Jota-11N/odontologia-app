import { useState } from "react";

export default function PacienteForm() {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    dni: "",
    telefono: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Paciente registrado:", formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded-2xl p-6 border border-gray-200"
    >
      <h3 className="text-lg font-semibold text-secondary mb-4">
        Registrar Paciente
      </h3>

      <div className="grid grid-cols-1 gap-3">
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={formData.nombre}
          onChange={handleChange}
          className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-primary"
        />
        <input
          type="text"
          name="apellido"
          placeholder="Apellido"
          value={formData.apellido}
          onChange={handleChange}
          className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-primary"
        />
        <input
          type="text"
          name="dni"
          placeholder="DNI"
          value={formData.dni}
          onChange={handleChange}
          className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-primary"
        />
        <input
          type="text"
          name="telefono"
          placeholder="Teléfono"
          value={formData.telefono}
          onChange={handleChange}
          className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-primary"
        />
        <button
          type="submit"
          className="bg-primary text-white py-2 rounded-md hover:bg-secondary transition"
        >
          Registrar
        </button>
      </div>
    </form>
  );
}
