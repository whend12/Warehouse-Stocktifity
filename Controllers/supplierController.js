import Supplier from '../model/supplierModels.js';



//Get all suppliers
export const getAllSuppliers = async (req, res) => {
    try {
        const suppliers = await Supplier.find();
        res.status(200).json(suppliers);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

//Search supplier by name
export const searchSupplier = async (req, res) => {
    try {
        const suppliers = await Supplier.find({ name: { $regex: req.params.name, $options: "i" } });
        res.status(200).json(suppliers);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

//Get supplier by id
export const getSupplierById = async (req, res) => {
    try {
        const supplier = await Supplier.findById(req.params.id);
        if (supplier === null) {
            return res.status(401).json({ message: "Supplier not found" })
        }
        res.status(200).json(supplier);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

//Create supplier and check it if Supplier already exists
export const createSupplier = async (req, res) => {
    try {
        const existingSupplierName = await Supplier.findOne({ name: req.body.name })
        if (existingSupplierName) {
            return res.status(400).json({ messageName: "Supplier with the same name already exist " });
        }
        const existingSupplierEmail = await Supplier.findOne({ email: req.body.email })
        if (existingSupplierEmail) {
            return res.status(400).json({ messageEmail: "Supplier with the same Email already exist " });
        }
        const existingSupplierPhone = await Supplier.findOne({ phone: req.body.phone })
        if (existingSupplierPhone) {
            return res.status(400).json({ messagePhone: "Supplier with the same Number Phone already exist " });
        }

        const supplier = await Supplier.create(req.body);
        res.status(201).json({ message: " supplier created successfully", supplier });
    } catch (error) {
        res.json({ message: error.message })
    }

}

//Update supplier by Id with validate
export const updateSupplier = async (req, res) => {
    try {
        const supplier = await Supplier.findById(req.params.id);

        if(!supplier){
            return res.status(404).json({message: 'Supplier not found'});
        }

        const { name, email, phone } = req.body;
        const existingSupplierName = await Supplier.findOne({ name });
        const existingSupplierEmail = await Supplier.findOne({ email });
        const existingSupplierPhone = await Supplier.findOne({ phone });

        if(existingSupplierName && existingSupplierName._id.toString() !== req.params.id){
            return res.status(400).json({ messageName: 'A Supplier with the same name Already exists'});
        }

        if(existingSupplierEmail && existingSupplierEmail._id.toString() !== req.params.id ) {
            return res.status(400).json({ messageEmail: 'A Supplier with the same Email Already exists' });
        }

        if(existingSupplierPhone && existingSupplierPhone._id.toString() !== req.params.id) {
            return res.status(400).json({ messagePhone: ' A Supplier with the same Number Phone Already exists'})
        }

        await Supplier.findByIdAndUpdate(req.params.id, { $set: req.body });
        res.status(200).json({ message: 'Supplier Updated' })


    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//Delete supplier
export const deleteSupplier = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Supplier.findByIdAndDelete(id);
        res.status(201).json({ message: " supplier Delete successfully", data });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
