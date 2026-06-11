import express from 'express';
import Offer from '../models/Offer.js';
import { requireAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// @route   GET /api/offers
// @desc    Get all offers
// @access  Public
router.get('/', async (req, res) => {
  try {
    const offers = await Offer.find().sort({ createdAt: -1 });
    res.json(offers);
  } catch (error) {
    console.error('Error fetching offers:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   POST /api/offers
// @desc    Create a new offer
// @access  Private/Admin
router.post('/', requireAdmin, async (req, res) => {
  try {
    const newOffer = new Offer(req.body);
    const savedOffer = await newOffer.save();
    
    const io = req.app.get('io');
    if (io) io.emit('offerCreated', savedOffer);

    res.status(201).json(savedOffer);
  } catch (error) {
    console.error('Error creating offer:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   PUT /api/offers/:id
// @desc    Update an offer
// @access  Private/Admin
router.put('/:id', requireAdmin, async (req, res) => {
  try {
    const updatedOffer = await Offer.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!updatedOffer) return res.status(404).json({ message: 'Offer not found' });

    const io = req.app.get('io');
    if (io) io.emit('offerUpdated', updatedOffer);

    res.json(updatedOffer);
  } catch (error) {
    console.error('Error updating offer:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   DELETE /api/offers/:id
// @desc    Delete an offer
// @access  Private/Admin
router.delete('/:id', requireAdmin, async (req, res) => {
  try {
    const offer = await Offer.findByIdAndDelete(req.params.id);
    if (!offer) return res.status(404).json({ message: 'Offer not found' });

    const io = req.app.get('io');
    if (io) io.emit('offerDeleted', req.params.id);

    res.json({ message: 'Offer deleted successfully' });
  } catch (error) {
    console.error('Error deleting offer:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

export default router;
