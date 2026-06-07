const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// Public demo version - no authentication or database
// All endpoints return placeholder responses
app.use('/auth', (req, res) => {
    res.status(200).json({ message: 'Demo mode - no authentication available' });
});

module.exports = app;