import { useEffect } from "react";
import { googleLogin } from "../../services/authService";

export default function GoogleLoginButton({ onLogin }) {
  const handleCredentialResponse = async (response) => {
    try {
      const tokenId = response.credential;

      // Enviar el token al backend para validar
      const data = await googleLogin(tokenId);

      // Guardar token y datos del usuario
      localStorage.setItem("token", data.token);
      localStorage.setItem("usuario", JSON.stringify(data.usuario));

      // Redirigir según el rol de forma segura
      const rol = data.usuario.rol.nom_rol.toLowerCase(); 
      if (rol === "paciente") {
        window.location.href = "/pacientes";
      } else if (rol === "odontologo") {
        window.location.href = "/odontologos";
      } else if (rol === "admin") {
        window.location.href = "/admin";
      } else {
        window.location.href = "/";
      }

      onLogin(data);
    } catch (error) {
      console.error("Error en login con Google:", error);
      alert("Error al iniciar sesión con Google");
    }
  };

  useEffect(() => {
    if (!document.getElementById("google-login-script")) {
      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.defer = true;
      script.id = "google-login-script";
      document.body.appendChild(script);
    }

    const interval = setInterval(() => {
      if (window.google?.accounts?.id) {
        clearInterval(interval);

        window.google.accounts.id.initialize({
          client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
          callback: handleCredentialResponse,
        });

        window.google.accounts.id.renderButton(
          document.getElementById("google-login-btn"),
          { theme: "outline", size: "large", width: 300, text: "signin_with" }
        );
      }
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center">
      <div id="google-login-btn"></div>
      <p className="text-xs text-gray-500 mt-2">
        Solo cuentas institucionales @unajma.edu.pe
      </p>
    </div>
  );
}
