import express from 'express';
import { authorizeRoles, isAuthenticatedUser } from '../middleware/authMiddleware.js';
import { createProduct, getProduct } from '../controller/productController.js';

const router = express.Router();

router.post("/create-product", isAuthenticatedUser, authorizeRoles, createProduct);
router.get("/get-product/:id", isAuthenticatedUser, authorizeRoles, getProduct);

export default router;
