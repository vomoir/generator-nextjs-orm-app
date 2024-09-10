const sqlite3 = require("sqlite3").verbose();

// Connecting to or creating a new SQLite database file
const db = new sqlite3.Database(
    "./collection.db",
    sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
    (err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log("Connected to the SQlite database.");
    }
);

// Serialize method ensures that database queries are executed sequentially
db.serialize(() => {
    // Create the users table if it doesn't exist
    db.run(
        ` CREATE TABLE IF NOT EXISTS users (
            id	INTEGER NOT NULL UNIQUE,
            name	TEXT NOT NULL,
            email	TEXT NOT NULL UNIQUE,
            password	TEXT NOT NULL,
            PRIMARY KEY("id" AUTOINCREMENT)
      );`,
        (err) => {
            if (err) {
                return console.error(err.message);
            }
            console.log("Created 'users' table.");

            // Clear the existing data in the users table
            db.run(`DELETE FROM users`, (err) => {
                if (err) {
                    return console.error(err.message);
                }
                console.log("All rows deleted from users");

                // Insert new data into the users table
                const values1 = [
                    "Basil Brush",
                    "basil@brush.com",
                    "password",
                ];
                const values2 = [
                    "Bobby Hawke ",
                    "bob@hawke.com",
                    "password",
                ];

                const values3 = [
                    "Eddie Barton",
                    "eddie@barton.com",
                    "password",
                ];

                const values4 = [
                    "Jaco Pastorius",
                    "jaco@virtuosobass.com",
                    "password",
                ];

                const insertSql = 'insert into users(name, email, password) VALUES (?,?,?);'

                db.run(insertSql, values1, function (err) {
                    if (err) {
                        return console.error(err.message);
                    }
                    const id = this.lastID; // get the id of the last inserted row
                    console.log(`Rows inserted, ID ${id}`);
                });

                db.run(insertSql, values2, function (err) {
                    if (err) {
                        return console.error(err.message);
                    }
                    const id = this.lastID; // get the id of the last inserted row
                    console.log(`Rows inserted, ID ${id}`);
                });

                db.run(insertSql, values3, function (err) {
                    if (err) {
                        return console.error(err.message);
                    }
                    const id = this.lastID; // get the id of the last inserted row
                    console.log(`Rows inserted, ID ${id}`);
                });

                db.run(insertSql, values4, function (err) {
                    if (err) {
                        return console.error(err.message);
                    }
                    const id = this.lastID; // get the id of the last inserted row
                    console.log(`Rows inserted, ID ${id}`);
                });

                let createInvoices = 'CREATE TABLE invoices (id INTEGER NOT NULL, customer_id	INTEGER NOT NULL, amount REAL NOT NULL, status	TEXT NOT NULL, date	TEXT NOT NULL, 	PRIMARY KEY("id" AUTOINCREMENT));';
                // db.run(createInvoices, function (err) {
                //     return console.error(err.message);
                // });

                db.run(createInvoices, (err) => {
                    if (err) {
                        return console.error(err.message);
                    }
                    console.log("Created 'users' table.");
                });

                //   Close the database connection after all insertions are done
                db.close((err) => {
                    if (err) {
                        return console.error(err.message);
                    }
                    console.log("Closed the database connection.");
                });
            })
        })
});