import express from 'express';
import { forgotPassword, getUser, login, logout, register, resetPassword, updatePassword, updateProfile } from '../controller/authController.js';
import { isAuthenticatedUser } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/me", isAuthenticatedUser, getUser);
router.post("/logout", isAuthenticatedUser, logout);
router.post("/forgot/password", forgotPassword);
router.put("/password/reset/:token", resetPassword);
router.post("/update-password", isAuthenticatedUser, updatePassword);
router.put("/me/update", isAuthenticatedUser, updateProfile);

export default router;
