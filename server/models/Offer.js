import mongoose from 'mongoose';

const offerSchema = new mongoose.Schema({
  image: { type: String, required: true },
  title: { type: String, required: true },
  discount: { type: String, required: true },
  originalPrice: { type: Number, required: true },
  salePrice: { type: Number, required: true },
  desc: { type: String, required: true },
  to: { type: String, required: true },
  gradient: { type: String, required: true },
  badge: { type: String, required: true },
  badgeColor: { type: String, required: true },
  items: [{ type: String }],
}, {
  timestamps: true
});

const Offer = mongoose.model('Offer', offerSchema);
export default Offer;
