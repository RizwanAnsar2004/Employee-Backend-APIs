const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./Routes/UserRoutes');
const errorHandler = require('./Middlewares/ErrorHandler');
const OTPRoutes = require('./Routes/OTPRoutes');
const dbConnect = require('./Config/db');
const authRoutes = require('./Routes/AuthRoutes');
const bankRoutes = require("./Routes/AddBankDataRoutes");

const app = express();

app.use(express.json());

dbConnect();

app.use('/api/users', userRoutes);

app.use('/api/otp', OTPRoutes);

app.use('/api/auth', authRoutes);

app.use("/api/banks", bankRoutes);

app.use(errorHandler);

module.exports = app;
