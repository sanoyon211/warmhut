import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  color: {
    type: String,
  },
  image: {
    type: String,
  },
  stock: {
    type: Number,
    default: 10,
  },
}, {
  timestamps: true,
});

const Product = mongoose.model('Product', productSchema);

export default Product;
