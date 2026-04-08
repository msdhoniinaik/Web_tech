const express = require('express');
const router = express.Router();

// Sample data
let products = [
    { id: 1, name: "Laptop" },
    { id: 2, name: "Phone" }
];

// GET all products
router.get('/', (req, res) => {
    res.json(products);
});

// GET product by ID
router.get('/:id', (req, res) => {
    const product = products.find(p => p.id == req.params.id);
    if(product) res.json(product);
    else res.send("Product not found");
});

// POST new product
router.post('/', (req, res) => {
    const newProduct = {
        id: products.length + 1,
        name: req.body.name
    };
    products.push(newProduct);
    res.json(newProduct);
});

// PUT update product
router.put('/:id', (req, res) => {
    const product = products.find(p => p.id == req.params.id);
    if(product){
        product.name = req.body.name;
        res.json(product);
    } else {
        res.send("Product not found");
    }
});

// DELETE product
router.delete('/:id', (req, res) => {
    products = products.filter(p => p.id != req.params.id);
    res.send("Product deleted");
});

module.exports = router;