import express from 'express';
const router = express.Router();

import {
  createSingleProduct,
  deleteProduct,
  getAllProducts,
  updateProduct,
} from '../controllers/product.controller.js';

router.get('/', getAllProducts);

router.post('/', createSingleProduct);

router.put('/:id', updateProduct);

router.delete('/:id', deleteProduct);

export default router;
