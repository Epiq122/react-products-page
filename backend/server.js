import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import Product from './models/product.model.js';

dotenv.config();
const app = express();

// middleware
app.use(express.json()); // allows us to accept JSON data in the req.body

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

app.listen(5002, () => {
  connectDB();
  console.log('Server started at http://localhost:5002');
});
