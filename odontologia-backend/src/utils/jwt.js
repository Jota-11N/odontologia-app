import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "clave_secreta_super_segura";

export const generateToken = (user) => {
  return jwt.sign(
    { id: user.id_usu, rol: user.rol },
    SECRET_KEY,
    { expiresIn: "2h" }
  );
};

export const verifyToken = (token) => {
  return jwt.verify(token, SECRET_KEY);
};
