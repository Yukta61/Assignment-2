const Product = require('../models/Product');


exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


exports.addProduct = async (req, res) => {
    const product = new Product(req.body);
    try {
        const savedProduct = await product.save();
        res.status(201).json(savedProduct);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};


exports.updateProduct = async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedProduct) return res.status(404).json({ message: 'Product not found' });
        res.status(200).json(updatedProduct);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};


exports.removeProduct = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) return res.status(404).json({ message: 'Product not found' });
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


exports.removeAllProducts = async (req, res) => {
    try {
        await Product.deleteMany();
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


exports.findProductsByName = async (req, res) => {
    const { name } = req.query;
    try {
        const products = await Product.find({ name: new RegExp(name, 'i') }); // Case insensitive search
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
