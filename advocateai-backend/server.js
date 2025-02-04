// const express = require("express");
// const cors = require("cors");

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Middleware
// app.use(cors());
// app.use(express.json()); // Allows JSON request bodies

// // Basic test route
// app.get("/", (req, res) => {
//     res.send("Express server is running!");
// });

// // Start the server
// app.listen(PORT, () => {
//     console.log(`Server running on http://localhost:${PORT}`);
// });

const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Allows JSON request bodies




// Routes
app.get("/home", (req, res) => {
    res.send("Welcome to the Home Page!");
});

app.get("/document-check", (req, res) => {
    res.send("This is the Document Check Page!");
});

app.get("/section-one", (req, res) => {
    res.send("Welcome to Section One!");
});

app.get("/section-two", (req, res) => {
    res.send("Welcome to Section Two!");
});

app.get("/section-three", (req, res) => {
    res.send("Welcome to Section Three!");
});

app.get("/section-four", (req, res) => {
    res.send("Welcome to Section Four!");
});



app.post("/section-one", (req, res) => {
    const formData = req.body; // Get form data from the request
    console.log("Received data:", formData); // Log it to check
    res.json({ message: "Data received successfully!", data: formData });
});

app.post("/section-two", (req, res) => {
    const formData = req.body;
    console.log("Received Section Two data:", formData);
    res.json({ message: "Section Two data received successfully!", data: formData });
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
