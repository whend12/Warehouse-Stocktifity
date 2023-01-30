import express from 'express';

import {
    getProducts,
    getProductBySKU,
    createProduct,
    updateProduct,
    deleteProduct
} from '../controllers/productController.js';
    

const router = express.Router();

router.get('/', getProducts);
router.get('/:sku', getProductBySKU);
router.post('/', createProduct);
router.patch('/:sku', updateProduct);
router.delete('/:sku', deleteProduct);

export default router;
