import Product from '../model/productModels.js'



export const getProducts = async (req, res) => {
    try {
        try {
            const products = await Product.find();
            res.json(products);
    } catch (error) {
        res.json({ message: error.message });
    }  
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


//create product
export const createProduct = async (req, res) => {
   try {
    await Product.create(req.body);
    res.json({
        "Message": "Product Created"
    })
    
   } catch (error) {
    
   }
};



//update product by SKU

export const updateProduct = async (req, res) => {
    try {
        await Product.updateOne({ sku: req.params.sku }, req.body);
        res.json({
            "message": "Product Updated"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
};


//delete product By SKU
export const deleteProduct = async (req, res) => {
    try {
        await Product.deleteOne({ sku: req.params.sku });
        res.json({
            "message": "Product Deleted"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
};