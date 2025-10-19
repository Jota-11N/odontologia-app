// src/components/Auth/LoginForm.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/authService";

const LoginForm = () => {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validar dominio institucional
    if (!correo.endsWith("@unajma.edu.pe")) {
      setError("Solo se permiten correos institucionales @unajma.edu.pe");
      return;
    }

    try {
      // Enviar al backend el objeto correcto
      const res = await login({ cor_usu: correo, con_usu: contrasena });

      if (res.token && res.usuario) {
        // Guardar token y usuario en localStorage
        localStorage.setItem("token", res.token);
        localStorage.setItem("usuario", JSON.stringify(res.usuario));

        // Redirigir según rol
        const rol = res.usuario.id_rol;
        if (rol === 1) navigate("/admin"); // Admin
        else if (rol === 2) navigate("/odontologos"); // Odontólogo
        else navigate("/pacientes"); // Paciente
      } else {
        setError("Respuesta inesperada del servidor.");
      }
    } catch (err) {
      console.error(err);
      setError("Credenciales incorrectas o error de conexión.");
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-8 w-96">
      <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
        Sistema Odontológico 🦷
      </h2>

      {error && (
        <div className="bg-red-100 text-red-700 text-sm p-2 rounded mb-3">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-600 font-medium mb-1">
            Correo institucional
          </label>
          <input
            type="email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
            placeholder="usuario@unajma.edu.pe"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block text-gray-600 font-medium mb-1">
            Contraseña
          </label>
          <input
            type="password"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            required
            placeholder="••••••••"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Ingresar
        </button>
      </form>

      <div className="text-center mt-4">
        <p className="text-sm text-gray-500">
          © 2025 Sistema Odontológico UNAJMA
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
