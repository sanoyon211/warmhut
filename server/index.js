import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { auth } from "./auth.js";
import { toNodeHandler } from "better-auth/node";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import wishlistRoutes from "./routes/wishlistRoutes.js";
import promoRoutes from "./routes/promoRoutes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:5175",
    process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
    origin: allowedOrigins,
    credentials: true, // Necessary for cookies (session)
}));

app.use(express.json());

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

// Default route for testing
app.get("/", (req, res) => {
    res.send("Warmhut Backend API is running!");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
