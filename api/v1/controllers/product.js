const productCollection = require('../models/Product');

exports.getAllProducts = async (req, res) => {
  try {
    const products = await productCollection.find().toArray();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

exports.getProductById = async (req, res) => {
  const id = req.params.id;

  try {
    const product = await productCollection.findOne({ _id: ObjectId(id) });
    if (!product) {
      res.status(404).send('Product not found');
      return;
    }

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

exports.createProduct = async (req, res) => {
  const newProduct = req.body;

  try {
    await productCollection.insertOne(newProduct);
    res.status(201).send('Product created successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

exports.updateProduct = async (req, res) => {
  const id = req.params.id;
  const updatedProduct = req.body;

  try {
    await productCollection.updateOne({ _id: ObjectId(id) }, { $set: updatedProduct });
    res.json({ message: 'Product updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

exports.deleteProduct = async (req, res) => {
  const id = req.params.id;

  try {
    await productCollection.deleteOne({ _id: ObjectId(id) });
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};
