import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import Product from './models/product.model.js';
import mongoose from 'mongoose';

dotenv.config();
const app = express();

// middleware
app.use(express.json()); // allows us to accept JSON data in the req.body

// get all products
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find({});
    res.send({ success: true, data: products });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ success: false, message: error.message });
  }
});

// get single product
app.post('/api/products', async (req, res) => {
  const product = req.body; // user will send this data
  if (!product.name || !product.price || !product.image) {
    return res
      .status(400)
      .send({ success: false, message: 'Please fill all fields' });
  }
  const newProduct = new Product(product);
  try {
    await newProduct.save();
    res.status(201).send({ success: true, data: newProduct });
  } catch (error) {
    console.log(error.message);

    return res.status(500).send({ success: false, message: error.message });
  }
});

// update product
app.put('/api/products/:id', async (req, res) => {
  const { id } = req.params;
  const product = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .send({ success: false, message: 'Product not found' });
  }
  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
    });
    res.status(200).send({ success: true, data: updatedProduct });
  } catch (error) {
    console.log('error in updating product:', error.message);
    res.status(500).send({ success: false, message: error.message });
  }
});

// delete product
app.delete('/api/products/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Product.findByIdAndDelete(id);
    res.send({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    console.log('error in deleting product:', error.message);
    res.status(404).send({ success: false, message: 'Product not found' });
  }
});

app.listen(5002, () => {
  connectDB();
  console.log('Server started at http://localhost:5002');
});
