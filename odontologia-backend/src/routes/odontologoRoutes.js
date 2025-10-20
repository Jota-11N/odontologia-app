import express from "express";
import { authenticateToken } from "../middlewares/authMiddleware.js";
import { getDashboardData } from "../controllers/odontologoController.js";

const router = express.Router();

// Ruta para obtener los datos del dashboard del odontólogo
router.get("/dashboard", authenticateToken, getDashboardData);

export default router;
