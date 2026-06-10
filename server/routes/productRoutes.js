import express from 'express';
import Product from '../models/Product.js';

const router = express.Router();

// @route   GET /api/products
// @desc    Get all products (with optional filtering)
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { category, color } = req.query;
    
    // Build query object
    const query = {};
    if (category) query.category = category;
    if (color) query.color = color;

    const products = await Product.find(query).sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   GET /api/products/:id
// @desc    Get product by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   POST /api/products
// @desc    Create a product
// @access  Public (Should be Admin in production)
router.post('/', async (req, res) => {
  try {
    const { name, price, category, color, image, stock } = req.body;

    const newProduct = new Product({
      name,
      price,
      category,
      color,
      image,
      stock
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

export default router;
