require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRouter = require('./authRouter');
const config = require('./config');
const PORT = config.port;

const app = express();

// app.use(cors({
//   origin: 'http://127.0.0.1:5501',
//   methods: ['GET', 'POST'],
//   allowedHeaders: ['Content-Type', 'Authorization']
// }));

// app.use(cors({
//   origin: function (origin, callback) {
//     if (!origin || origin.startsWith('http://127.0.0.1') || origin.startsWith('http://localhost')) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   methods: ['GET', 'POST'],
//   allowedHeaders: ['Content-Type', 'Authorization']
// }));
app.use(cors());

app.use(express.json());
app.use("/auth", authRouter);

const start = async () => {
  try {
    await mongoose.connect(`mongodb+srv://code0case_db_user:${config.password}@snakegamecluster.ffp4ojm.mongodb.net/?appName=SnakeGameCluster`);
    app.listen(PORT, () => {
      console.log(`SERVER IS RUNNING ON ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
}
start();
