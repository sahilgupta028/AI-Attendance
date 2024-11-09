import fs from 'fs/promises'; // Use promises version for async operations
import path from 'path'; // Import path module for handling file paths

export async function POST(req: Request) {
    try {
        // Extract the form data from the request
        const { query, studentDetails } = await req.json();

        // Ensure the query is present
        if (!query) {
            console.error("query data is missing.");
            return new Response(JSON.stringify({ error: "query data is required" }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }


        // Send the base64 query data to the backend server for recognition
        const response = await fetch('http://127.0.0.1:8000/chatbot', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query, studentDetails }), // Sending the original base64 query
        });

        // Check if the backend response is successful
        if (!response.ok) {
            console.error("Backend recognition failed:", response.statusText);
            return new Response(JSON.stringify({ error: "Failed to process query in backend" }), {
                status: response.status,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // Parse backend response
        const result = await response.json();
        const res = result.response || "Unknown";

        console.log(result);

        // Return recognized name to frontend
        return new Response(JSON.stringify({ res }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error("Error processing query:", error);
        return new Response(JSON.stringify({ error: "Failed to recognize face" }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}