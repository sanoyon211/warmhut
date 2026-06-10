import express from 'express';
import PromoCode from '../models/PromoCode.js';

const router = express.Router();

// @route   POST /api/promo/validate
// @desc    Validate a promo code and return discount
// @access  Public
router.post('/validate', async (req, res) => {
  try {
    const { code } = req.body;
    if (!code) return res.status(400).json({ message: 'Promo code is required' });

    const promo = await PromoCode.findOne({ code: code.toUpperCase() });

    if (!promo) {
      return res.status(404).json({ message: 'Invalid promo code' });
    }

    if (!promo.isActive) {
      return res.status(400).json({ message: 'This promo code is no longer active' });
    }

    if (promo.expiresAt && new Date() > promo.expiresAt) {
      return res.status(400).json({ message: 'This promo code has expired' });
    }

    res.json({ discountPercent: promo.discountPercent, message: `Promo applied! You get ${promo.discountPercent}% off.` });
  } catch (error) {
    console.error('Error validating promo:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Secret dev route to quickly create a promo code for testing
router.post('/create-dev', async (req, res) => {
  try {
    const { code, discountPercent } = req.body;
    const existing = await PromoCode.findOne({ code });
    if (existing) return res.json({ message: 'Already exists', promo: existing });
    
    const promo = new PromoCode({ code, discountPercent });
    await promo.save();
    res.json({ message: 'Created', promo });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
