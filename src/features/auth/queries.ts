"use server";

import { Account, Client } from "node-appwrite"
import { AUTH_COOKIE_NAME } from "./constants";
import { cookies } from "next/headers";

export const protectRoute = async () => {
    try {
        const client = new Client()
            .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
            .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!)

        const session = await cookies().get(AUTH_COOKIE_NAME)?.value;
        if (!session) return null;

        client.setSession(session);
        const account = new Account(client);

        return await account.get();
    } catch (error) {
        console.error(error);
        return null;
    }
};