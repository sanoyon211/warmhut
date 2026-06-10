import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';

dotenv.config();

const mongoUri = process.env.MONGODB_URI || "mongodb://localhost:27017/warmhut";

const seedProducts = [
  {
    name: "Lyle & Scott Cap (Jet Black)",
    price: 350,
    category: "Caps",
    color: "black",
    image: "/assets/Caps/BASEBALL UNISEX - Cap - jet black.webp",
    stock: 20
  },
  {
    name: "Lyle & Scott Cap (White)",
    price: 350,
    category: "Caps",
    color: "white",
    image: "/assets/Caps/white.webp",
    stock: 15
  },
  {
    name: "HUF Cap (Black)",
    price: 350,
    category: "Caps",
    color: "black",
    image: "/assets/Caps/Huf black.webp",
    stock: 10
  },
  {
    name: "Nike Sportswear Cap (White)",
    price: 350,
    category: "Caps",
    color: "white",
    image: "/assets/Caps/Nike Sportswear(white).webp",
    stock: 5
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB');

    // Optional: Clear existing products
    // await Product.deleteMany({});
    // console.log('Cleared existing products');

    await Product.insertMany(seedProducts);
    console.log('Successfully seeded database with sample products!');

    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding database:', error);
    mongoose.connection.close();
    process.exit(1);
  }
};

seedDatabase();
