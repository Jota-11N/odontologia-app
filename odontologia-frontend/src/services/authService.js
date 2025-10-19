import axios from "axios";

// Login clásico (correo + contraseña)
export const login = async (data) => {
  return await axios
    .post("http://localhost:3001/api/usuarios/login", data)
    .then(res => res.data)
    .catch(err => { throw err; }); // permite capturar errores en LoginForm.jsx
};


// Login con Google
export const googleLogin = async (tokenId) => {
  return await axios
    .post("http://localhost:3001/api/auth/google", { tokenId })
    .then(res => res.data);
};
