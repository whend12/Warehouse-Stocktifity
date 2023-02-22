import express from 'express'

import {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    searchProduct
} from '../controllers/productController.js'

import {
    getAllSuppliers,
    getSupplierById,
    createSupplier,
    updateSupplier,
    deleteSupplier
} from '../controllers/supplierController.js'

import {
    getUsers,
    Register,
    Login,
    Logout,
} from '../controllers/userController.js'

import { verifyToken } from '../middleware/verifyToken.js'
import { refreshToken } from '../middleware/refreshToken.js'

const router = express.Router()

router.route('/products').get(getProducts).post(createProduct)
router.route('/products/:id').get(getProductById).put(updateProduct).delete(deleteProduct)
router.route('/products/search/:name').get(searchProduct)

router.route('/suppliers').get(getAllSuppliers).post(createSupplier)
router.route('/suppliers/:id').get(getSupplierById).put(updateSupplier).delete(deleteSupplier)

router.get('/users', verifyToken);
router.post('/users', Register);
router.post('/login', Login);
router.get('/token', refreshToken);
router.delete('/logout', Logout);


export default router;

