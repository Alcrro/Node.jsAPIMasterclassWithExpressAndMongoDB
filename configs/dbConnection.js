const mongoose = require('mongoose');
const colors = require('colors');

const connectDB = async (req, res, next) => {
  const conn = await mongoose.connect(process.env.MONGO_URI);

  console.log(`Mongo Connected: ${conn.connection.host.green}`);
};

module.exports = connectDB;
