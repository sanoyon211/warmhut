import express from 'express';
import Order from '../models/Order.js';
import { sendOrderConfirmationEmail, sendOrderStatusEmail } from '../utils/sendEmail.js';

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
    const { userId, customer, items, payment, financials } = req.body;

    // Basic validation
    if (!customer || !items || items.length === 0 || !financials) {
      return res.status(400).json({ message: 'Missing required order fields' });
    }

    const orderId = generateOrderId();

    const newOrder = new Order({
      orderId,
      userId,
      customer,
      items,
      payment,
      financials,
      status: 'Pending'
    });

    const savedOrder = await newOrder.save();
    
    // Send email asynchronously (don't block the response)
    sendOrderConfirmationEmail(savedOrder);
    
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

// @route   GET /api/orders/user/:userId
// @desc    Get all orders for a specific user
// @access  Public (for now)
router.get('/user/:userId', async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.error('Error fetching user orders:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   PATCH /api/orders/:id/status
// @desc    Update order status
// @access  Public (Should be Admin)
router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    if (!['Pending', 'Shipped', 'Delivered'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!order) return res.status(404).json({ message: 'Order not found' });

    // Send status update email if status is shipped or delivered
    if (status === 'Shipped' || status === 'Delivered') {
      sendOrderStatusEmail(order);
    }

    res.json(order);
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

export default router;
