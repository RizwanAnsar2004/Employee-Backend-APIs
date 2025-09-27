require('dotenv').config();
const mongoose = require("mongoose");
const bycrypt = require("bcrypt");
const user = require("../Models/UserModel");
const dbConnect = require('../Config/db');
const { status, role } = require("../Utils/Enums");

async function seedSuperAdmin(){
    try
    {
        await dbConnect();
        const hashedPassword = await bycrypt.hash('superadmin123', 10);
        const superAdmin = new user({
            email: 'superadmin@gmail.com',
            phoneNo: '03151144836',
            password: hashedPassword,
            isSystemAdmin: true,
            roleID: role.SUPER_ADMIN,
            statusID: status.VERIFIED
        });
        await superAdmin.save();
        console.log('Super admin seeded successfully');
    }

    catch (err) 
    {
    console.error(err.message);
    }  

    finally 
    {
    mongoose.connection.close();
    }

}
seedSuperAdmin();