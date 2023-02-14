import express from 'express'
import { verifyToken } from '../middleware/verifyToken.js';

import {
    getProducts,
    getProductBySKU,
    createProduct,
    updateProduct,
    deleteProduct
} from '../Controllers/productController.js';

const router = express.Router();

//Products
router.get('/products', getProducts);
router.get('/products/:sku', getProductBySKU);
router.post('/products', createProduct);
router.put('/products/:sku', updateProduct);
router.delete('/products/:sku', deleteProduct);


export default router;