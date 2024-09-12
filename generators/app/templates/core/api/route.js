import sqlite3 from "sqlite3";
import { path } from "path";
import { open, Database } from "sqlite";

// Let's initialize it as null initially, and we will assign the actual database instance later.
let db = null;

// Define the GET request handler function
export async function GET(req, res) {
    // Check if the database instance has been initialized
    if (!db) {
        // If the database instance is not initialized, open the database connection
        db = await open({
            filename: "./collection.db", // Specify the database file path
            // filename: path.join(process.cwd(), "collection.db"),
            driver: sqlite3.Database, // Specify the database driver (sqlite3 in this case)
        });
    }

    // Perform a database query to retrieve all items from the "customers" table
    const items = await db.all("SELECT * FROM customers");

    // Return the items as a JSON response with status 200
    return new Response(JSON.stringify(items), {
        headers: { "Content-Type": "application/json" },
        status: 200,
    });
}

export async function getCustomers(req, res) {
    // Check if the database instance has been initialized
    if (!db) {
        // If the database instance is not initialized, open the database connection
        db = await open({
            filename: "./collection.db", // Specify the database file path
            // filename: path.join(process.cwd(), "collection.db"),
            driver: sqlite3.Database, // Specify the database driver (sqlite3 in this case)
        });
    }

    // Perform a database query to retrieve all items from the "customers" table
    const items = await db.all("SELECT * FROM customers");

    // Return the items as a JSON response with status 200
    return new Response(JSON.stringify(items), {
        headers: { "Content-Type": "application/json" },
        status: 200,
    });
}
