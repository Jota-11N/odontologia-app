// src/routes/authRoutes.js
import express from 'express';
import { login, googleLogin } from '../controllers/authController.js';

const router = express.Router();

// Login clásico
router.post('/login', login);

// Login con Google
router.post('/google', googleLogin);

export default router;
