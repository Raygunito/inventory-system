import express from 'express';
import UserController from './user.controller';
import authMiddleware from "./auth.middleware";

const userRoutes = express.Router();

userRoutes.put("/updateRole", authMiddleware.authenticateToken, authMiddleware.authorizeAdmin, UserController.updateRole);
userRoutes.put("/changePassword", authMiddleware.authenticateToken, UserController.changePassword);
userRoutes.delete("/delete", authMiddleware.authenticateToken, authMiddleware.authorizeAdmin, UserController.deleteUser);

export default userRoutes;