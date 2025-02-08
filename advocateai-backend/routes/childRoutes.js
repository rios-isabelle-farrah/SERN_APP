

// const express = require("express");
// const db = require("../database");
// const router = express.Router();
// const { v4: uuidv4 } = require('uuid'); // Import the uuid library

// router.post("/section-two", (req, res) => { // Or router.post("/child-info", ...) if the base path is different
//     console.log("Request Body:", req.body);
//     const { parent_id, ...childFormData } = req.body;

//     if (!parent_id) {
//         return res.status(400).json({ message: "Parent ID is required" });
//     }

//     const parentIdString = String(parent_id); // Convert parent_id to string (important!)
//     const childId = uuidv4(); // Generate a UUID for the child record

//     db.run(
//         "INSERT INTO child_info (id, parent_id, studentFullName, dateOfBirth, studentID, currentGradeLevel, schoolType, schoolName, schoolAddress, currentPlacement, districtNumber, hasIEP, iepNumber, lastIEPMeetingDate, primaryDisability) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
//         [childId, parentIdString, childFormData.studentFullName, childFormData.dateOfBirth, childFormData.studentID, childFormData.currentGradeLevel, childFormData.schoolType, childFormData.schoolName, childFormData.schoolAddress, childFormData.currentPlacement, childFormData.districtNumber, childFormData.hasIEP, childFormData.iepNumber, childFormData.lastIEPMeetingDate, childFormData.primaryDisability],
//         function (err) {
//             if (err) {
//                 console.error("Error inserting child info:", err);
//                 return res.status(500).json({ message: err.message });
//             }
//             console.log(`A row has been inserted with rowID ${this.lastID}`);
//             res.json({ message: "Child info inserted successfully" });
//         }
//     );
// });

// module.exports = router;


const express = require("express");
const db = require("../database");
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

router.post("/section-two", (req, res) => {
    console.log("Received Section Two data:", req.body); // More descriptive log
    const { parent_id, ...childFormData } = req.body;

    if (!parent_id) {
        return res.status(400).json({ message: "Parent ID is required" });
    }

    const parentIdString = String(parent_id);
    const childId = uuidv4();

    db.serialize(() => { // Wrap in db.serialize for transaction control
        db.run(
            "INSERT INTO child_info (id, parent_id, studentFullName, dateOfBirth, studentID, currentGradeLevel, schoolType, schoolName, schoolAddress, currentPlacement, districtNumber, hasIEP, iepNumber, lastIEPMeetingDate, primaryDisability) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [childId, parentIdString, childFormData.studentFullName, childFormData.dateOfBirth, childFormData.studentID, childFormData.currentGradeLevel, childFormData.schoolType, childFormData.schoolName, childFormData.schoolAddress, childFormData.currentPlacement, childFormData.districtNumber, childFormData.hasIEP, childFormData.iepNumber, childFormData.lastIEPMeetingDate, childFormData.primaryDisability],
            function (err) {
                if (err) {
                    console.error("Error inserting child info:", err);  // Log the error object
                    return res.status(500).json({ message: "Database error", error: err.message }); // Send detailed error to client
                }

                console.log(`A row has been inserted with rowID ${this.lastID}`);

                db.run("COMMIT", [], (commitErr) => {  // Commit transaction
                    if (commitErr) {
                        console.error("Commit error:", commitErr);
                        return res.status(500).json({ message: "Database commit error" });
                    }
                    console.log("✅ Child data inserted and committed successfully.");
                    res.json({ message: "Child info inserted successfully", childId }); // Send childId in response

                });
            }
        );
    });
});

module.exports = router;
