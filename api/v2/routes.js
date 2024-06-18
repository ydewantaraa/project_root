const express = require('express');
const router = express.Router();
const Product = require('../models/Product'); // Import model Product

router.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/products/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const product = await Product.findById(id);
    if (!product) {
      res.status(404).send('Product not found');
      return;
    }

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

router.post('/products', async (req, res) => {
  const newProduct = new Product(req.body);

  try {
    await newProduct.save();
    res.status(201).send('Product created successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

router.put('/products/:id', async (req, res) => {
  const id = req.params.id;
  const updatedProduct = req.body;

  try {
    await Product.findByIdAndUpdate(id, updatedProduct);
    res.json({ message: 'Product updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

router.delete('/products/:id', async (req, res) => {
  const id = req.params.id;

  try {
    await Product.findByIdAndDelete(id);
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
