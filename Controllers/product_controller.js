const ItemModel = require('../Models/ItemModel');

const addItem = async (req, res) => {
    try {
        const { name, price } = req.body;

        if (!name || !price) {
            return res.status(400).json({
                message: "Name and Price are required fields",
                success: false
            });
        }

        const newItem = new ItemModel({ name, price });
        await newItem.save();  

        res.status(201).json({
            message: "Item added successfully",
            success: true,
            item: newItem
        });

    } catch (err) {
        res.status(500).json({
            message: "Internal server error",
            success: false, 
            error: err.message
        });
    }
};

module.exports = { addItem };

