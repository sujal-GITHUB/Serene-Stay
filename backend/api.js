const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const auth = require("./routes/auth.js");
const house = require("./routes/house.js");
const reservations = require("./routes/reservations.js");

require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/auth", auth);
app.use("/house", house);
app.use("/reservations", reservations);

// Root Endpoint
app.get('/', (req, res) => {
    res.status(200).send(`Express server is working on port ${process.env.PORT}`);
});

// Function to connect to MongoDB and start the server
async function startServer() {
    try {
        // Database Connection
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to the MongoDB database successfully.');

        // Starting the Server
        const port = process.env.PORT || 5000; // Default to port 5000 if not set
        app.listen(port, () => {
            console.log(`Server is running at http://localhost:${port}`);
        });
    } catch (err) {
        console.error('Error starting the server or connecting to the database:', err.message);
        process.exit(1); // Exit the process with failure
    }
}

// Start the Server
startServer();
