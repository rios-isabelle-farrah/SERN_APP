const express = require("express");
const db = require("../database"); // Import database connection
const router = express.Router();

// Create Parent Info (POST /parent-info)
router.post("/section-one", (req, res) => {
    const {
        fullName, address, phoneNumber, cellPhone, emailAddress,
        emailNotice, primaryLanguage, interpreterNeeded, signLanguageInterpreter,
        relationshipToStudent
    } = req.body;

    const sql = `
        INSERT INTO parent_info 
        (fullName, address, phoneNumber, cellPhone, emailAddress, emailNotice, 
         primaryLanguage, interpreterNeeded, signLanguageInterpreter, relationshipToStudent) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.run(
        sql,
        [fullName, address, phoneNumber, cellPhone, emailAddress, emailNotice ? 1 : 0,
         primaryLanguage, interpreterNeeded, signLanguageInterpreter, relationshipToStudent],
        function (err) {
            if (err) {
                console.error(" Error saving parent info:", err.message);
                res.status(500).json({ message: "Database error", error: err.message });
            } else {
                console.log("Parent info saved with ID:", this.lastID);
                res.json({ message: "Parent info submitted successfully!", id: this.lastID });
            }
        }
    );
});

// Get All Parent Info (GET /parent-info)
router.get("/", (req, res) => {
    const sql = "SELECT * FROM parent_info";

    db.all(sql, [], (err, rows) => {
        if (err) {
            console.error(" Error fetching parent info:", err.message);
            res.status(500).json({ message: "Database error", error: err.message });
        } else {
            console.log("Retrieved parent info:", rows);
            res.json(rows);
        }
    });
});

// Get Single Parent Info by ID (GET /parent-info/:id)
router.get("/:id", (req, res) => {
    const { id } = req.params;
    const sql = "SELECT * FROM parent_info WHERE id = ?";

    db.get(sql, [id], (err, row) => {
        if (err) {
            console.error(" Error fetching parent info by ID:", err.message);
            res.status(500).json({ message: "Database error", error: err.message });
        } else if (!row) {
            res.status(404).json({ message: "Parent info not found" });
        } else {
            console.log("Retrieved parent info by ID:", row);
            res.json(row);
        }
    });
});

// Update Parent Info (PUT /parent-info/:id)
router.put("/:id", (req, res) => {
    const { id } = req.params;
    const {
        fullName, address, phoneNumber, cellPhone, emailAddress,
        emailNotice, primaryLanguage, interpreterNeeded, signLanguageInterpreter,
        relationshipToStudent
    } = req.body;

    const sql = `
        UPDATE parent_info 
        SET fullName = ?, address = ?, phoneNumber = ?, cellPhone = ?, emailAddress = ?, 
            emailNotice = ?, primaryLanguage = ?, interpreterNeeded = ?, signLanguageInterpreter = ?, 
            relationshipToStudent = ?
        WHERE id = ?
    `;

    db.run(
        sql,
        [fullName, address, phoneNumber, cellPhone, emailAddress, emailNotice ? 1 : 0,
         primaryLanguage, interpreterNeeded, signLanguageInterpreter, relationshipToStudent, id],
        function (err) {
            if (err) {
                console.error(" Error updating parent info:", err.message);
                res.status(500).json({ message: "Database error", error: err.message });
            } else if (this.changes === 0) {
                res.status(404).json({ message: "Parent info not found" });
            } else {
                console.log("Parent info updated for ID:", id);
                res.json({ message: "Parent info updated successfully!" });
            }
        }
    );
});

// Delete Parent Info (DELETE /parent-info/:id)
router.delete("/:id", (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM parent_info WHERE id = ?";

    db.run(sql, [id], function (err) {
        if (err) {
            console.error(" Error deleting parent info:", err.message);
            res.status(500).json({ message: "Database error", error: err.message });
        } else if (this.changes === 0) {
            res.status(404).json({ message: "Parent info not found" });
        } else {
            console.log("Deleted parent info with ID:", id);
            res.json({ message: "Parent info deleted successfully!" });
        }
    });
});

module.exports = router;