

///------------------------------NEW CODE after parentRoutes.js

const express = require("express");
const cors = require("cors");
const parentRoutes = require("./routes/parentRoutes"); // Import parent routes
const childRoutes = require("./routes/childRoutes"); // Import parent routes
const allCaseInfoRoutes = require("./routes/allCaseInfoRoutes"); // Import new route


const db = require("./database"); // Import database connection

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Allows JSON request bodies

// ✅ Use Parent Routes
app.use("/parent-info", parentRoutes);
app.use("/child-info", childRoutes);
app.use("/all-case-info", allCaseInfoRoutes); 



// ✅ Basic Test Route
app.get("/", (req, res) => {
    res.send("Express server is running!");
});

// ✅ Section Routes (Keep only non-parent routes here)
app.get("/home", (req, res) => res.send("Welcome to the Home Page!"));
app.get("/document-check", (req, res) => res.send("This is the Document Check Page!"));
app.get("/section-one", (req, res) => res.send("Welcome to Section One!"));
app.get("/section-two", (req, res) => res.send("Welcome to Section Two!"));
app.get("/section-three", (req, res) => res.send("Welcome to Section Three!"));
app.get("/section-four", (req, res) => res.send("Welcome to Section Four!"));


app.post("/section-two", (req, res) => {
    console.log("Received Section Two data:", req.body);
    res.json({ message: "Section Two data received successfully!", data: req.body });
});

app.post("/section-three", (req, res) => {
    console.log("Received Section Three data:", req.body);
    res.json({ message: "Section Three data received successfully!", data: req.body });
});

app.post("/section-four", (req, res) => {
    console.log("Received Section Four data:", req.body);
    res.json({ message: "Section Four data received successfully!", data: req.body });
});

// ✅ Start the Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
