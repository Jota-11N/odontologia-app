// src/pages/OdontologosPage.jsx
import React, { useEffect, useState } from "react";
import { getOdontologos, crearOdontologo } from "../services/odontologoService";

const OdontologosPage = () => {
  const [odontologos, setOdontologos] = useState([]);
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [correo, setCorreo] = useState("");
  const [error, setError] = useState("");

  // Cargar odontólogos
  const cargarOdontologos = async () => {
    try {
      const data = await getOdontologos();
      setOdontologos(data);
    } catch (err) {
      console.error(err);
      setError("No se pudieron cargar los odontólogos");
    }
  };

  useEffect(() => {
    cargarOdontologos();
  }, []);

  const handleCrearOdontologo = async (e) => {
    e.preventDefault();
    setError("");

    if (!nombre || !apellido || !correo) {
      setError("Todos los campos son obligatorios");
      return;
    }

    try {
      const nuevo = await crearOdontologo({ nombre, apellido, correo });
      setOdontologos((prev) => [...prev, nuevo]);
      setNombre("");
      setApellido("");
      setCorreo("");
    } catch (err) {
      console.error(err);
      setError("Error al crear odontólogo");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Gestión de Odontólogos</h2>

      {error && <div className="bg-red-100 text-red-700 p-2 rounded mb-4">{error}</div>}

      <form onSubmit={handleCrearOdontologo} className="mb-6 space-y-2">
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="border px-2 py-1 rounded w-full"
        />
        <input
          type="text"
          placeholder="Apellido"
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
          className="border px-2 py-1 rounded w-full"
        />
        <input
          type="email"
          placeholder="Correo"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          className="border px-2 py-1 rounded w-full"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Crear Odontólogo
        </button>
      </form>

      <h3 className="text-xl font-semibold mb-2">Lista de Odontólogos</h3>
      <ul className="space-y-2">
        {odontologos.map((o) => (
          <li key={o.id} className="border p-2 rounded flex justify-between">
            <span>{o.nombre} {o.apellido}</span>
            <span>{o.correo}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OdontologosPage;
