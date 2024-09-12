const sqlite3 = require("sqlite3").verbose();
const {
    invoices,
    customers,
    revenue,
    users,
} = require('./placeholder-data.js');

const bcrypt = require('bcrypt');

// Connecting to or creating a new SQLite database file
const db = new sqlite3.Database(
    "collection.db",
    sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
    (err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log("Connected to the SQlite database.");
    }
);

onError = function (tx, e) {
    alert("There has been an error: " + e.message);
}

onSuccess = function (tx, r) {
    console.log("Success?");
}

// Serialize method ensures that database queries are executed sequentially
db.serialize(() => {
    // Create the users table if it doesn't exist
    db.run(
        ` CREATE TABLE IF NOT EXISTS users (
            id INTEGER NOT NULL UNIQUE,
            name TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL,
            PRIMARY KEY("id" AUTOINCREMENT)
      );`,
        (err) => {
            if (err) {
                return console.error(err.message);
            }
            console.log(" ");
            console.log("Created 'users' table.");

            // Clear the existing data in the users table
            db.run(`DELETE FROM users`, (err) => {
                if (err) {
                    return console.error(err.message);
                }
                console.log("All rows deleted from users");

                console.log(`inserting Users`);
                for (var i = 0; i < users.length; i++) {
                    (async function (i) {
                        const hashedPassword = await bcrypt.hash(users[i].password, 10);
                        db.run('INSERT INTO users (name, email, password) VALUES ("' + users[i].name + '","' + users[i].email + '","' + hashedPassword + '")', function (err) {
                            if (err) {
                                return console.log(err.message);
                            }
                        })
                    })(i);
                }

                let createCustomers = ` CREATE TABLE IF NOT EXISTS customers (
                    id INTEGER NOT NULL UNIQUE,
                    name TEXT NOT NULL,
                    email TEXT NOT NULL UNIQUE,
                    image_url TEXT NOT NULL,
                    PRIMARY KEY("id" AUTOINCREMENT)
              );`
                db.run(createCustomers, (err) => {
                    if (err) {
                        return console.error(err.message);
                    }
                    console.log(" ");
                    console.log("Created 'customers' table.");
                    // Clear the existing data in the users table
                    db.run(`DELETE FROM customers`, (err) => {
                        if (err) {
                            return console.error(err.message);
                        }
                        console.log("");
                        console.log("All rows deleted from customers");
                        console.log("");
                        console.log(`inserting customers`);
                        console.log("");
                        for (var i = 0; i < customers.length; i++) {
                            (function (i) {
                                db.run('INSERT INTO customers (name, email, image_url) VALUES ("' + customers[i].name + '","' + customers[i].email + '","' + customers[i].image_url + '")', function (err) {
                                    if (err) {
                                        return console.log(err.message);
                                    }
                                })
                            })(i);
                        }
                    });
                    console.log("");
                    console.log("creating invoices table...");
                    console.log("");
                    let createInvoices = 'CREATE TABLE IF NOT EXISTS invoices (id INTEGER NOT NULL, customer_id	INTEGER NOT NULL, amount REAL NOT NULL, status	TEXT NOT NULL, date	TEXT NOT NULL, 	PRIMARY KEY("id" AUTOINCREMENT));';
                    db.run(createInvoices, (err) => {
                        if (err) {
                            return console.error(err.message);
                        }
                        console.log("Created 'invoices' table.");
                        db.run(`DELETE FROM invoices`, (err) => {
                            if (err) {
                                return console.error(err.message);
                            }
                            console.log("");
                            console.log("All rows deleted from invoices");
                            console.log(`inserting invoices`);
                            for (var i = 0; i < invoices.length; i++) {
                                (function (i) {
                                    db.run('INSERT INTO invoices (customer_id, amount, status, date) VALUES (' + invoices[i].customer_id + ',' + invoices[i].amount + ',"' + invoices[i].status + '","' + invoices[i].date + '")', function (err) {
                                        if (err) {
                                            return console.log(err.message);
                                        }
                                    })
                                })(i);
                            }
                        });
                    });
                    console.log("");
                    console.log("creating revenue table...");
                    let createRevenue = 'CREATE TABLE IF NOT EXISTS revenue (id INTEGER NOT NULL, month	TEXT NOT NULL, revenue REAL NOT NULL, PRIMARY KEY("id" AUTOINCREMENT));';
                    db.run(createRevenue, (err) => {
                        if (err) {
                            return console.error(err.message);
                        }
                        console.log("Created 'revenue' table.");
                        db.run(`DELETE FROM revenue`, (err) => {
                            if (err) {
                                return console.error(err.message);
                            }
                            console.log("All rows deleted from revenue");
                            console.log(`inserting revenue`);
                            for (var i = 0; i < revenue.length; i++) {
                                (function (i) {
                                    db.run('INSERT INTO revenue (month, revenue) VALUES ("' + revenue[i].month + '",' + revenue[i].revenue + ')', function (err) {
                                        if (err) {
                                            return console.log(err.message);
                                        }
                                    })
                                })(i);
                            }
                        });
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
        }
    )
});