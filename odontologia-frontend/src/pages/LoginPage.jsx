import LoginForm from "../components/Auth/LoginForm";
import GoogleLoginButton from "../components/Auth/GoogleLoginButton";

export default function LoginPage() {
  const handleLogin = (data) => {
    // Guardar token y datos del usuario en localStorage
    localStorage.setItem("token", data.token);
    localStorage.setItem("usuario", JSON.stringify(data.usuario));

    // Redirigir según el rol usando el nombre del rol en minúsculas
    const rol = data.usuario.rol.nom_rol.toLowerCase(); // "paciente", "odontologo", "admin"

    if (rol === "paciente") {
      window.location.href = "/pacientes";
    } else if (rol === "odontologo") {
      window.location.href = "/odontologos";
    } else if (rol === "admin") {
      window.location.href = "/admin";
    } else {
      window.location.href = "/";
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#F8F8F8]">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-blue-700">
          Sistema Odontológico 🦷
        </h1>
        <p className="text-gray-600 text-sm mt-1">
          Universidad Nacional José María Arguedas
        </p>
      </div>

      {/* Login clásico */}
      <LoginForm onLogin={handleLogin} />

      {/* Divider visual */}
      <div className="my-4 text-gray-400 font-medium">o</div>

      {/* Login con Google */}
      <GoogleLoginButton onLogin={handleLogin} />

      <footer className="mt-6 text-xs text-gray-400">
        © 2025 Sistema de Citas Odontológicas — UNAJMA
      </footer>
    </div>
  );
}
