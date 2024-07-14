const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

const corsOptions = {
  origin: 'https://i-task-nine.vercel.app', // Update with your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
};
app.use(cors(corsOptions));
app.use(bodyParser.json());

mongoose.connect(`${process.env.MONGOURI}/i-task`).then(() => {
  console.log('MongoDB connected');
});

// Routes
const tasksRouter = require('./routes/tasks');
app.use('/api/tasks', tasksRouter); // Use /api prefix to match frontend proxy configuration

// Start Server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
