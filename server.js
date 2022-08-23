const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const errorHandler = require('./middleware/error');
const connectDB = require('./configs/dbConnection');

//Load env vars
dotenv.config({ path: './configs/.env' });

// Connect to database

connectDB();

//Routes files
const bootcampRoutes = require('./routes/bootcamps/bootcampRoutes');

const server = express();

//Body Parser
server.use(express.json());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  server.use(morgan('dev'));
}

//Mounts router
server.use('/api/v1/bootcamps', bootcampRoutes);
server.use(errorHandler);

const PORT = process.env.PORT || 5000;

const serverApp = server.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV.green} mode on port ${PORT.green}`
  )
);

//Handler unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  //close server and exit process
  serverApp.close(() => process.exit(1));
});
