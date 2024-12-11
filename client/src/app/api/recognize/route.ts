import fs from 'fs/promises'; // Use promises version for async operations
import path from 'path'; // Import path module for handling file paths

export async function POST(req: Request) {
    try {
        // Extract the form data from the request
        const { image } = await req.json();

        console.log(image);

        // Ensure the image is present
        if (!image) {
            console.error("Image data is missing.");
            return new Response(JSON.stringify({ error: "Image data is required" }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // Define the upload directory and create it if it doesn't exist
        const uploadDir = 'uploads';
        await fs.mkdir(uploadDir, { recursive: true });

        // Create a unique file name (e.g., with a timestamp and a file extension)
        const fileName = `${Date.now()}.png`; // Assuming the image is a PNG; adjust as needed
        const filePath = path.join(uploadDir, fileName); // Use path.join for cross-platform compatibility

        // Extract the base64 image data and write it to the server's file system
        const base64Data = image.split(',')[1]; // Remove the data URL prefix
        const buffer = Buffer.from(base64Data, 'base64'); // Convert base64 to binary
        await fs.writeFile(filePath, buffer); // Write to file asynchronously


        console.log(fileName);

        // Send the base64 image data to the backend server for recognition
        const response = await fetch('http://127.0.0.1:8000/recognize', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ fileName }), // Sending the original base64 image
        });

        // Check if the backend response is successful
        if (!response.ok) {
            console.error("Backend recognition failed:", response.statusText);
            return new Response(JSON.stringify({ error: "Failed to process image in backend" }), {
                status: response.status,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // Parse backend response
        const result = await response.json();
        const recognizedName = result.name || "Unknown";

        await fs.unlink(filePath);

        // Return recognized name to frontend
        return new Response(JSON.stringify({ name: recognizedName }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error("Error processing image:", error);
        return new Response(JSON.stringify({ error: "Failed to recognize face" }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
