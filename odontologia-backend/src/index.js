//src/index.js
import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import usuarioRoutes from "./routes/usuarioRoutes.js"; // 👈 agrega esto

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/usuarios", usuarioRoutes); // 👈 agrega esto

app.listen(3001, () => console.log("Backend corriendo en http://localhost:3001"));
