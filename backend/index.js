const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

mongoose.connect(`${process.env.MONGOURI}/i-task`).then(() => {
  console.log('mongodb connected');
});

// Routes
const tasksRouter = require('./routes/tasks');
app.use('/tasks', tasksRouter);

// Start Server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
