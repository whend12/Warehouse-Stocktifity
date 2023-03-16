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
    createPendingProduct,
    getAllPendingProducts,
    inbound,
    outbond
} from '../controllers/pendingProductController.js'

import{
    getOutBoundHistory
} from '../Controllers/outboundHistory.js'

import{
    getInBoundHistory
} from '../Controllers/inboundHistory.js'

import {
    getUsers,
    Register,
    Login,
    Logout,
} from '../controllers/userController.js'

import { verifyToken } from '../middleware/verifyToken.js'
import { refreshToken } from '../middleware/refreshToken.js'
import { validateSupplier } from '../middleware/validateSupplier.js'
import { validateProduct } from '../middleware/validateProduct.js'


const router = express.Router()

//Product Route
router.route('/products')
    .get(getProducts)
    .post(createProduct)
router.route('/products/:id')
    .get(getProductById)
    .put(updateProduct)
    .delete(deleteProduct)
router.route('/products/search/:name')
    .get(searchProduct)

//Pending Product Route
router.route('/pending')
    .get(getAllPendingProducts)
    .post(createPendingProduct)

// inbound product (Product akan nambah atau buat product baru jika di confirm)
router.route('/inbound/:id')
    .put(inbound)

// outbond product (Product akan berkurang jika di confirm)
router.route('/outbond/:id')
    .put(outbond)

//outbound-history
router.route('/outbound-history')
.get(getOutBoundHistory)
//inbound-history
router.route('/inbound-history')
.get(getInBoundHistory)


//Supplier Route
router.route('/suppliers')
    .get(getAllSuppliers)
    .post(createSupplier)
router.route('/suppliers/:id')
    .get(getSupplierById)
    .put(updateSupplier)
    .delete(deleteSupplier)

//User Route
router.get('/users', verifyToken);
router.post('/users', Register);
router.post('/login', Login);
router.get('/token', refreshToken);
router.delete('/logout', Logout);


export default router;

