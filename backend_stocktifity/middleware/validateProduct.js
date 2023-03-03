import Product from '../model/productModels.js'

export const validateProduct = async (req, res, next) => {
    const productId = req.params.id
    const productName = req.body.name
    const productSku = req.body.sku
    
    const product = await Product.findOne(
        {name: productName},
        {sku: productSku});
        if(product && product._id !== productId) {
            return res.status(400).json({message: "Product already exists"})
        }
    next();


}