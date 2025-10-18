const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');  // <-- add this
const userRoutes = require('./Routes/UserRoutes');
const errorHandler = require('./Middlewares/ErrorHandler');
const OTPRoutes = require('./Routes/OTPRoutes');
const dbConnect = require('./Config/db');
const authRoutes = require('./Routes/AuthRoutes');
const bankRoutes = require("./Routes/AddBankDataRoutes");
const orgRoutes = require("./Routes/OrganizationRoutes");
const deptRoutes = require('./Routes/DepartmentRoutes');
const employeeRoutes = require('./Routes/EmployeeRoutes');

const app = express();

// Middlewares
app.use(express.json());

// CORS middleware (must come BEFORE routes)
app.use(cors({
  origin: 'http://localhost:3000', // your frontend URL
  methods: ['GET','POST','PUT','DELETE'],
  credentials: true
}));

// Database
dbConnect();

// Routes
app.use('/api/users', userRoutes);
app.use('/api/otp', OTPRoutes);
app.use('/api/auth', authRoutes);
app.use("/api/orgs", orgRoutes);
app.use("/api/banks", bankRoutes);
app.use('/department', deptRoutes);
app.use('/employees', employeeRoutes);

app.use(errorHandler);

module.exports = app;