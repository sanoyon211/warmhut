import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { auth } from "./auth.js";
import { toNodeHandler } from "better-auth/node";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import wishlistRoutes from "./routes/wishlistRoutes.js";
import promoRoutes from "./routes/promoRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure uploads folder exists
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Middleware
const allowedOrigins = [
    process.env.FRONTEND_URL || "http://localhost:5173",
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:5175",
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true, // Necessary for cookies (session)
}));

app.use(express.json());

// Serve Static Uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Connect to MongoDB using Mongoose
const mongoUri = process.env.MONGODB_URI || "mongodb://localhost:27017/warmhut";
mongoose.connect(mongoUri)
  .then(() => console.log('MongoDB connected via Mongoose'))
  .catch(err => console.error('MongoDB connection error:', err));

// Mount Better Auth handler
app.all("/api/auth/*path", toNodeHandler(auth));

// Mount Routes
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/promo", promoRoutes);
app.use("/api/contact", contactRoutes);

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// @route   POST /api/upload
// @desc    Upload an image
// @access  Public (Should be Admin)
app.post('/api/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  // Construct the full URL for the image
  const baseUrl = process.env.BETTER_AUTH_URL || 'http://localhost:5000';
  const imageUrl = `${baseUrl}/uploads/${req.file.filename}`;
  res.json({ imageUrl });
});

// Default route for testing
app.get("/", (req, res) => {
    res.send("Warmhut Backend API is running!");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
