const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRouter = require('../jscode/authRouter');
const config = require('../jscode/config');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', authRouter);

let isConnected = false;

async function connectDB() {
    if (isConnected) return;

    await mongoose.connect(
        `mongodb+srv://code0case_db_user:${config.password}@snakegamecluster.ffp4ojm.mongodb.net/?appName=SnakeGameCluster`
    );

    isConnected = true;
}

module.exports = async (req, res) => {
    await connectDB();
    return app(req, res);
};