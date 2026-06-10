import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
    baseURL: "http://localhost:5000/api/auth",
    user: {
        additionalFields: {
            phone: { type: "string" },
            address: { type: "string" },
            role: { type: "string" }
        }
    }
});

export const { signIn, signUp, signOut, useSession } = authClient;
