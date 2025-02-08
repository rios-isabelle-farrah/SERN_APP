const express = require("express");
const db = require("../database"); // Import database connection
const router = express.Router();

router.post("/section-one", (req, res) => {  // This is the route you need to modify
    console.log("Request Body:", req.body);
    const { parentId, ...formData } = req.body; // Destructure parentId and other form data

    if (!parentId) { // Very important check!
        return res.status(400).json({ message: "Parent ID is required" });
    }

    db.run("INSERT INTO parent_info (id, fullName, address, phoneNumber, cellPhone, emailAddress, emailNotice, primaryLanguage, interpreterNeeded, signLanguageInterpreter, relationshipToStudent) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [parentId, formData.fullName, formData.address, formData.phoneNumber, formData.cellPhone, formData.emailAddress, formData.emailNotice, formData.primaryLanguage, formData.interpreterNeeded, formData.signLanguageInterpreter, formData.relationshipToStudent],
        function(err) {
            if (err) {
                console.error("Error inserting parent info:", err);
                return res.status(500).json({ message: err.message }); // Send error message back to the client
            }
            console.log(`A row has been inserted with rowID ${this.lastID}`);
            res.json({ message: "Parent info inserted successfully", parentId }); // Send back the parentId
        });
});

// ... other routes in parentInfoRoutes.js ...

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


module.exports = router;