// const sqlite3 = require("sqlite3").verbose();

// // Create and connect to the SQLite database
// const db = new sqlite3.Database("./advocateai.db", (err) => {
//     if (err) {
//         console.error("Database connection error:", err.message);
//     } else {
//         console.log("Connected to the SQLite database.");
//     }
// });

// //Section 1 Inputs 
// db.serialize(() => {
//     db.run(`
//         CREATE TABLE IF NOT EXISTS parent_info (
//             id INTEGER PRIMARY KEY AUTOINCREMENT,
//             fullName TEXT,
//             address TEXT,
//             phoneNumber TEXT,
//             cellPhone TEXT,
//             emailAddress TEXT,
//             emailNotice BOOLEAN,
//             primaryLanguage TEXT,
//             interpreterNeeded TEXT,
//             signLanguageInterpreter TEXT,
//             relationshipToStudent TEXT
//         )
//     `);
// });

// // Export the database connection
// module.exports = db;

const sqlite3 = require("sqlite3").verbose();

// Create and connect to the SQLite database
const db = new sqlite3.Database("./advocateai.db", (err) => {
    if (err) {
        console.error("Database connection error:", err.message);
    } else {
        console.log("✅ Connected to the SQLite database.");
    }
});

// Section 1 Inputs 
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS parent_info (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            fullName TEXT,
            address TEXT,
            phoneNumber TEXT,
            cellPhone TEXT,
            emailAddress TEXT,
            emailNotice BOOLEAN,
            primaryLanguage TEXT,
            interpreterNeeded TEXT,
            signLanguageInterpreter TEXT,
            relationshipToStudent TEXT
        )
    `, (err) => {
        if (err) {
            console.error("❌ Error creating table:", err.message);
        } else {
            console.log("✅ Table parent_info created (or already exists).");
        }
    });
});

// Export the database connection
module.exports = db;
