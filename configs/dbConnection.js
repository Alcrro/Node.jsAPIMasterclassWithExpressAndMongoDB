const mongoose = require('mongoose');
const colors = require('colors');

const connectDB = async (req, res, next) => {
  const connect = await mongoose.connect(process.env.MONGO_URI);

  console.log(`Mongo Connected: ${connect.connection.host.green}`);
};

module.exports = connectDB;
