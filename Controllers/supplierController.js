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

        const newSupplier = new Supplier.create(req.body)
        return res.status(200).json({ message:"Supplier Created", data: newSupplier })

    } catch (error) {
        req.json({ message: error.message })
    }

}

//Update supplier with validate
export const updateSupplier = async (req, res) => {
    try {
        await Supplier.updateOne(req.params.id)
        res.json({
            "message": "Supplier Updated"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
}

//Delete supplier
export const deleteSupplier = async (req, res) => {
    try {
        await Supplier.deleteOne(req.params.id)
        res.json({
            "message": "Supplier Deleted"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
}

