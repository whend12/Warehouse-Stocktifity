import Product from '../models/productModel.js'


// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
export const getProducts = async (req, res) => {
    try {
        const products = await Product.findAll(
            // {
            //     where: {
            //         id: req.params.id
            //     }.sort({ createdAt: -1 })
        );
        res.json(products);
    } catch (error) {
        res.json({ message: error.message });
    }
};


// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
export const getProductById = async (req, res) => {
    try {
        const product = await Product.findAll({
            where: {
                id: req.params.id
            }
        });
    } catch (error) {
        
    }
};


//create product
export const createProduct = async (req, res) => {
    const { name,sku,quantity,category } = req.body

    if (!name || sku || quantity || category ) {
        res.status(400);
        throw new Error('Please fill in all fields')
    }

    const product = await Product.create({
        name,
        sku,
        quantity,
        category
    })
    res.status(201).json(product)

};

//update product

export const updateProduct = async (req, res) => {
    const { name,sku,quantity,category } = req.body

    const product = await Product.findById(req.params.id)

    if (product) {
        product.name = name
        product.sku = sku
        product.quantity = quantity
        product.category = category

        const updatedProduct = await product.save()
        res.json(updatedProduct)
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
};


//delete product
export const deleteProduct = async (req, res) => {
    try {
        await Product.destroy({
            where: {
                id: req.params.id
            }
            });
        res.json({
            "message": "Product Deleted"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
};