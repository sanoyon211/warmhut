import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

// MONGODB_URI should be added to .env
const mongoUri = process.env.MONGODB_URI || "mongodb://localhost:27017/warmhut";

const client = new MongoClient(mongoUri);

// The connection is handled implicitly by the adapter, 
// but it's good practice to connect during server startup if you need to access it elsewhere.
export const db = client.db();

export const auth = betterAuth({
    database: mongodbAdapter(db, {
        usePlural: true
    }),
    emailAndPassword: {
        enabled: true,
    },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        }
    }
});
