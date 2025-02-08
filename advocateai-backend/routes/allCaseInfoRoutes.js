

const express = require("express");
const db = require("../database"); // Import database connection
const router = express.Router();

// Promisify db.all
const dbAll = (sql, params = []) => {
    return new Promise((resolve, reject) => {
        db.all(sql, params, (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
};

// Get all case information (Joining parent_info and child_info)
// router.get("/", async (req, res) => {
//     try {
//         const sql = `
//             SELECT 
//                 parent_info.id AS parent_id, parent_info.fullName AS parent_name, parent_info.address, 
//                 parent_info.phoneNumber, parent_info.cellPhone, parent_info.emailAddress, parent_info.emailNotice,
//                 parent_info.primaryLanguage, parent_info.interpreterNeeded, parent_info.signLanguageInterpreter, 
//                 parent_info.relationshipToStudent,

//                 child_info.id AS child_id, child_info.studentFullName, child_info.dateOfBirth, 
//                 child_info.studentID, child_info.currentGradeLevel, child_info.schoolType,
//                 child_info.schoolName, child_info.schoolAddress, child_info.currentPlacement, 
//                 child_info.districtNumber, child_info.hasIEP, child_info.iepNumber, 
//                 child_info.lastIEPMeetingDate, child_info.primaryDisability

//             FROM parent_info
//             LEFT JOIN child_info ON parent_info.id = child_info.parent_id
//         `;

//         const rows = await dbAll(sql); // Use await to wait for the query to complete

//         console.log("✅ Retrieved case info:", rows);
//         res.json(rows);

//     } catch (err) {
//         console.error("❌ Error fetching case info:", err.message);
//         res.status(500).json({ message: "Database error", error: err.message });
//     }
// });

router.get("/", async (req, res) => {
    try {
        // ✅ Improved SQL query with aliases:
        const sql = `
            SELECT 
                p.id AS parent_id, p.fullName AS parent_name, p.address, 
                p.phoneNumber, p.cellPhone, p.emailAddress, p.emailNotice,
                p.primaryLanguage, p.interpreterNeeded, p.signLanguageInterpreter, 
                p.relationshipToStudent,

                c.id AS child_id, c.studentFullName, c.dateOfBirth, 
                c.studentID, c.currentGradeLevel, c.schoolType,
                c.schoolName, c.schoolAddress, c.currentPlacement, 
                c.districtNumber, c.hasIEP, c.iepNumber, 
                c.lastIEPMeetingDate, c.primaryDisability

            FROM parent_info p  -- Alias "parent_info" as "p"
            LEFT JOIN child_info c ON p.id = c.parent_id;  -- Alias "child_info" as "c"
        `;

        const rows = await dbAll(sql);
        console.log("✅ Retrieved case info:", rows);
        res.json(rows);

    } catch (err) {
        console.error("❌ Error fetching case info:", err.message); 
        res.status(500).json({ message: "Database error", error: err.message });
    }
});


module.exports = router;