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

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
