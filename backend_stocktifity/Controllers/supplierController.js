import { Model } from 'mongoose';
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
        res.status(200).json(supplier);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

//Create supplier and check it if Supplier already exists
export const createSupplier = async (req, res) => {
    try {
        const existingSupplierName = await Supplier.findOne({ name: req.body.name })
        const existingSupplierEmail = await Supplier.findOne({ email: req.body.email })
        const existingSupplierPhone = await Supplier.findOne({ phone: req.body.phone })

        if (existingSupplierName) {
            return res.status(400).json({ error:"Supplier with the same name already exist "});
        }
            else if (existingSupplierEmail) {
                return res.status(400).json({ error:"Supplier with the same Email already exist "});
        }
            else if (existingSupplierPhone) {
                return res.status(400).json({ error: "Supplier with the same Number Phone already exist "});
        }

        const supplier = await Supplier.create(req.body);
        res.status(201).json({message: " supplier created successfully", supplier});


    } catch (error) {
        res.json({ message: error.message })
    }

}

//Update supplier with validate
export const updateSupplier = async (req, res) => {
    try {
        const existingSupplierName = await Supplier.findOne({ name: req.body.name })
        const existingSupplierEmail = await Supplier.findOne({ email: req.body.email })
        const existingSupplierPhone = await Supplier.findOne({ phone: req.body.phone })
        
        if (existingSupplierName) {
            return res.status(400).json({message: "Supplier with the same name already exist "});
        } else if (existingSupplierEmail) {
            return res.status(400).json({message: "Supplier with the same Email already exist "});
        } else if (existingSupplierPhone) {
            return res.status(400).json({message: "Supplier with the same Number Phone already exist "});
        }

        const id = req.params.id;
        const updateData = req.body;
        const options = { new: true };

        const result = await Supplier.findByIdAndUpdate(id, updateData, options);
        console.log(result).json({message: "Supplier updated successfully"})

    } catch (error) {
        res.json({ message: error.message });
    }
}

//Delete supplier
export const deleteSupplier = async (req, res) => {
    try {
        await Supplier.deleteOne(req.params.name)
        res.json({
            "message": "Supplier Deleted"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
}

