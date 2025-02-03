import PendingProduct from "../model/pendingProduct.js";
import Product from '../model/productModels.js';
import outboundHistory from '../model/outboundHistoryModel.js'
import inboundHistory from '../model/inboundHistoryModel.js'
import Supplier from '../model/supplierModels.js';

//create new pending product
export const createPendingProduct = async (req, res) => {
    try {
        const pendingProduct = await PendingProduct.create(req.body);
        res.status(201).json({
            success: true,
            pendingProduct
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        })
    }
}

//get all pending products
export const getAllPendingProducts = async (req, res) => {
    try {
        const pendingProducts = await PendingProduct.find().populate("Supplier", "name");
        res.status(200).json({
            success: true,
            pendingProducts
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        })
    }
}

//confirmed pending product and passing it to product model
export const inbound = async (req, res) => {
    try {
        const pendingProduct = await PendingProduct.findById(req.params.id);
        if (!pendingProduct) {
            return res.status(404).send('Product not found');
        }
        if (pendingProduct.confirmed) {
            return res.status(400).send('Product already confirmed');
        }
        const { name, sku, supplier, quantity,category } = pendingProduct;
        let product = await Product.findOne({ name, sku, supplier ,category});
        if (!product) {
            product = new Product({ name, sku, supplier, quantity,category });
        } else {
            product.quantity += quantity;
        }
        await product.save();
        //history-inbound
        const supplierObj = await Supplier.findById(product.Supplier);
        // Tandai produk sebagai sudah dikonfirmasi
        await inboundHistory.create({ product: { name, sku, supplierId: supplierObj._id, category }, quantity, confirmed: true });

        await pendingProduct.delete();
        res.send('Product confirmed');
    } catch (error) {
        res.status(400).json({ message: error.message })
    }

};


//Confirm pending product and increase it from product model
export const outbond = async (req, res) => {
    try {
        const pendingProduct = await PendingProduct.findById(req.params.id);
        if (!pendingProduct) {
            return res.status(404).send('Product not found');
        }
        if (pendingProduct.confirmed) {
            return res.status(400).send('Product already confirmed');
        }
        const { name, sku, supplier, quantity, category } = pendingProduct;

        // Kurangi stok produk di collection Product
        const product = await Product.findOneAndUpdate(
            { name, sku, supplier },
            { $inc: { quantity: -quantity } }
        );
        if (!product) {
            return res.status(404).send('Product not found');
        }
            if(product.quantity < 0){
                return res.status(400).send('Product quantity is not enough');
        }
        // Cari supplier berdasarkan id
        const supplierObj = await Supplier.findById(product.Supplier);

        // Tandai produk sebagai sudah dikonfirmasi
        await outboundHistory.create({ product: { name, sku, supplierId: supplierObj._id, category }, quantity, confirmed: true });

        await pendingProduct.delete();
        res.send('Product confirmed');
    } catch (error) {
        console.error(error);
        res.status(400).send({ message: error.message });
    }
};



//delete pending product
export const deletePendingProduct = async (req, res) => {
    try {
        const pendingProduct = await PendingProduct.findById(req.params.id);
        if (!pendingProduct) {
            return res.status(404).send('Product not found');
        }
        await pendingProduct.delete();
        res.send('Product deleted');
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        })
    }
}

//edit pending product
export const editPendingProduct = async (req, res) => {
    try {
        const pendingProduct = await PendingProduct.findById(req.params.id);
        if (!pendingProduct) {
            return res.status(404).send('Product not found');
        }
        const updates = Object.keys(req.body);
        updates.forEach((update) => pendingProduct[update] = req.body[update]);
        await pendingProduct.save();
        res.send('Product updated');
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        })
    }
}