import Supplier from '../model/supplierModels.js';


export const validateSupplier = async (req, res, next) => {
    const supplierId = req.params.id
    const supplierName = req.body.name;
    const supplierEmail = req.body.email;
    const supplierPhone = req.body.phone;

    const supplier = await Supplier.findOne(
        {name: supplierName}, 
        {email: supplierEmail}, 
        {phone: supplierPhone});
            if(supplier && supplier._id !== supplierId) {
                return res.status(400).json({message: "Supplier already exists"});
            }
    next();

}