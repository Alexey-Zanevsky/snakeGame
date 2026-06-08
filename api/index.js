const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// Get the root directory (parent of api/)
const rootDir = path.resolve(__dirname, '..');

// Serve static files from project root
app.use(express.static(rootDir));

// Public demo version - no authentication or database
app.use('/auth', (req, res) => {
    res.status(200).json({ message: 'Demo mode - no authentication available' });
});

// Fallback to index.html for SPA
app.get('*', (req, res) => {
    res.sendFile(path.join(rootDir, 'index.html'));
});

module.exports = app;