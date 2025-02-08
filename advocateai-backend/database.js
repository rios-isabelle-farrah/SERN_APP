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
              id TEXT PRIMARY KEY,
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


    db.run(`
        CREATE TABLE IF NOT EXISTS child_info (
           id TEXT PRIMARY KEY,
            parent_id TEXT,
            studentFullName TEXT,
            dateOfBirth TEXT,
            studentID TEXT,
            currentGradeLevel TEXT,
            schoolType TEXT,
            schoolName TEXT,
            schoolAddress TEXT,
            currentPlacement TEXT,
            districtNumber TEXT,
            hasIEP TEXT,
            iepNumber TEXT,
            lastIEPMeetingDate TEXT,
            primaryDisability TEXT,
            FOREIGN KEY (parent_id) REFERENCES parent_info(id) ON DELETE CASCADE
        )
    `, (err) => {
        if (err) {
            console.error("❌ Error creating child_info table:", err.message);
        } else {
            console.log("✅ Table child_info created (or already exists).");
        }
    });
    







});


// Section 2 (Child Info Table)



// Export the database connection
module.exports = db;