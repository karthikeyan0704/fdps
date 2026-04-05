const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const recordRoutes = require('./routes/recordRoutes');
const summaryRoutes = require('./routes/summaryRoutes');

const app = express();

// --- Middleware Setup ---
app.use(express.json()); // Allows the API to understand JSON data from the user
app.use(bodyParser.urlencoded({ extended: true }));

// --- API Routing Logic ---
app.use('/api/users', userRoutes);
app.use('/api/records', recordRoutes);
app.use('/api/summary', summaryRoutes);

// Friendly Welcome Message
app.get('/', (req, res) => {
    res.json({ 
        greeting: 'Welcome to the Finance Dashboard API!',
        status: 'Everything is running smoothly.',
        nextSteps: 'Use Postman to query /api/summary or /api/records'
    });
});

// Friendly Error Handler
app.use((err, req, res, next) => {
    console.error('Oops! Something went wrong:', err.message);
    res.status(err.status || 500).json({
        error: {
            message: 'We encountered an unexpected issue on our end. Please try again later.',
            details: err.message
        }
    });
});

module.exports = app;
