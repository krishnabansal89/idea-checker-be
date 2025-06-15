"use server";
import { dbConnect } from "@/lib/db";
import Startup from "@/lib/db";

export async function createEntry(idea: string) {
    try {
        await dbConnect();
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const uuid = crypto.randomUUID();
        const location = await response.json();
        await Startup.create({
            request_id: uuid,
            request: { idea },
            geoLocation: location,
        });
        return { success: true, message: "Idea submitted successfully" , uuid: uuid };

    } catch (error) {
        console.error("Error checking idea:", error);
        return { error: "Failed to check idea" };
    }
}