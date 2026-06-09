import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { auth } from "./auth.js";
import { toNodeHandler } from "better-auth/node";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true, // Necessary for cookies (session)
}));

app.use(express.json());

// Mount Better Auth handler
app.all("/api/auth/*", toNodeHandler(auth));

// Default route for testing
app.get("/", (req, res) => {
    res.send("Warmhut Backend API is running!");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
