import Product from '../model/productModels.js'




export const getProducts = async (req, res) => {
    try {
        const products = await Product.find().populate("Supplier","name");
        res.json(products);
    } catch (error) {
        res.json({ message: error.message });
    }
};

//getProductById
export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate("Supplier");
        if(product === null){
            return res.status(401).json({message: "Product not found"})
        }
        res.json(product);
    } catch (error) {
        res.json({ message: error.message });
    }
}

//Search product by name
export const searchProduct = async (req, res) => {
    try {
        const products = await Product.find({ name: { $regex: req.params.name, $options: "i" } });
        res.json(products);
    } catch (error) {
        res.json({ message: error.message });
    }
};

//get product by SKU
// export const getProductBySKU = async (req, res) => {
//     try {
//         const product = await Product.findOne({ sku: req.params.sku });
//         res.json(product);
//     } catch (error) {
//         res.json({ message: error.message });
//     }
// };


//create product and validate if SKU already exists
export const createProduct = async (req, res) => {
    try {
        const existingProductSku = await Product.findOne({sku: req.body.sku});
            if (existingProductSku) {
              return res.status(400).json({messageSku: "SKU already exists"});
        } ;
        const existingProductName = await Product.findOne({name: req.body.name});
            if (existingProductName) {
            return res.status(400).json({messageName: "Name already exists"});
        } ;

        const product = await Product.create(req.body);
        res.status(201).json({message: "Product created successfully", product});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
    



//update product by ID and validate if SKU and Name already exists

export const updateProduct = async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
  
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      const { name, sku } = req.body;
      const existingProductByName = await Product.findOne({ name });
      const existingProductBySku = await Product.findOne({ sku });
  
      if (existingProductByName && existingProductByName._id.toString() !== req.params.id) {
        return res.status(400).json({ messageName: 'A product with the same name already exists' });
      }
  
      if (existingProductBySku && existingProductBySku._id.toString() !== req.params.id) {
        return res.status(400).json({ messageSku: 'A product with the same SKU already exists' });
      }
  
      await Product.findByIdAndUpdate(req.params.id, { $set: req.body });
      res.status(200).json({ message: 'Product updated' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  


//delete product By ID
export const deleteProduct = async (req, res) => {
    try {
        const id = req.params.id
        const data = await Product.findByIdAndDelete(id)
        res.status(200).json({
            message: "Product Deleted"
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};