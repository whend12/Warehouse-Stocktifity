import Supplier from '../model/supplierModels.js';

export const getAllSuppliers = async (req, res) => {
    try {
        const suppliers = await Supplier.find();
        res.status(200).json(suppliers);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const getSupplierById = async (req, res) => {
    try {
        const supplier = await Supplier.findById({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(supplier);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createSupplier = async (req, res) => {
    try {
        await Supplier.create(req.body);
        res.json({
            "Message": "Supplier Created"
        })
    } catch (error) {
        res.json({ message: error.message });
    }
}
 
export const updateProduct = async (req, res) => {
    try {
        await Supplier.updateMany(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.json({
            "message": "Product Updated"
        });
    } catch (error) {
        res.json({ message: error.message });
    }  
}
 
export const deleteProduct = async (req, res) => {
    try {
        await Supplier.destroy({
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
}

