import express from 'express';
import UserController from './user.controller';
import authMiddleware from './auth.middleware';

const authRoutes = express.Router();

authRoutes.post('/login', UserController.login);

authRoutes.post('/register', UserController.register);

authRoutes.post('/logout', UserController.logout);

authRoutes.get("/dashboard", authMiddleware.authenticateToken, UserController.dashboard);


export default authRoutes;