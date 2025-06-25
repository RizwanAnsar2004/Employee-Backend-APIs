const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./Routes/UserRoutes');
const errorHandler = require('./Middlewares/ErrorHandler');
const dbConnect = require('./Config/db');

const app = express();

app.use(express.json());

dbConnect();

app.use('/api/users', userRoutes);

app.use(errorHandler);

module.exports = app;
