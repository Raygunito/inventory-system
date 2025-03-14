import express from 'express';
import UserController from './user.controller';
import authMiddleware from "./auth.middleware";

const userRoutes = express.Router();

userRoutes.put("/user/updateRole", authMiddleware.authenticateToken, authMiddleware.authorizeAdmin, UserController.updateRole);

userRoutes.delete("/user/delete", authMiddleware.authenticateToken, authMiddleware.authorizeAdmin, UserController.deleteUser);

export default userRoutes;