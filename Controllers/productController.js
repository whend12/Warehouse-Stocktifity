import Product from '../model/productModels.js'



export const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.json({ message: error.message });
    }
};




//get product by SKU
export const getProductBySKU = async (req, res) => {
    try {
        const product = await Product.findOne({ sku: req.params.sku });
        res.json(product);
    } catch (error) {
        res.json({ message: error.message });
    }
};


//create product and validate if SKU already exists
export const createProduct = async (req, res) => {
    try {
        const existingProduct = await Product.findOne({ sku: req.body.sku });
        if (existingProduct) {
            res.json({ message: "Product already exists" });
        } else {
            await Product.create(req.body);
            res.json({
                "message": "Product Created"
            });
        }
        
    } catch (error) {
        res.json({ message: error.message });
    }
}
    



//update product by SKU and validate if SKU already exists

export const updateProduct = async (req, res) => {
    try {
        const existingSku = await Product.findOne({ sku: req.params.sku });
        if (existingSku) {
            res.json({ message: "Product already exists" });
        } else {
            await Product.updateOne({ sku: req.params.sku }, req.body);
            res.json({
                "message": "Product Updated"
            });
        }
    } catch (error) {
        res.json({ message: error.message });
    }
};


//delete product By SKU
export const deleteProduct = async (req, res) => {
    try {
        await Product.deleteMany({ sku: req.params.sku });
        res.json({
            "message": "Product Deleted"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
};