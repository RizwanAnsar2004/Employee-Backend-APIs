const User = require('../Models/UserModel');

exports.getAllUsers = async () => {
  return await User.find();
};
