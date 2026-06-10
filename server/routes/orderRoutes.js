import express from 'express';
import Order from '../models/Order.js';

const router = express.Router();

// Generate a random Order ID (e.g., WH-123456)
const generateOrderId = () => {
  return 'WH-' + Math.floor(100000 + Math.random() * 900000);
};

// @route   POST /api/orders
// @desc    Create a new order
// @access  Public
router.post('/', async (req, res) => {
  try {
    const { customer, items, payment, financials } = req.body;

    // Basic validation
    if (!customer || !items || items.length === 0 || !financials) {
      return res.status(400).json({ message: 'Missing required order fields' });
    }

    const orderId = generateOrderId();

    const newOrder = new Order({
      orderId,
      customer,
      items,
      payment,
      financials,
      status: 'Pending'
    });

    const savedOrder = await newOrder.save();
    
    res.status(201).json({
      success: true,
      orderId: savedOrder.orderId,
      message: 'Order placed successfully'
    });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Server Error. Failed to place order.' });
  }
});

// @route   GET /api/orders
// @desc    Get all orders (Admin only ideally)
// @access  Public (for now)
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

export default router;
