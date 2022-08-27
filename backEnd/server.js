const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const errorHandler = require('./middleware/error');
const connectDB = require('./configs/dbConnection');
const cors = require('cors');
const logger = require('./utils/log');

//Load env vars
dotenv.config({ path: './configs/.env' });

// Connect to database

connectDB();

//Routes files
const bootcampRoutes = require('./routes/bootcamps/bootcampRoutes');
const coursesRoutes = require('./routes/courses/coursesRoutes');
const navbarRoutes = require('./routes/navbarmenu/navbarRoutes');

const server = express();

//Body Parser
server.use(express.json());
server.use(cors());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  server.use(morgan('dev'));
}

//Mounts router
server.use('/api/v1/bootcamps', bootcampRoutes);
server.use('/api/v1/courses', coursesRoutes);
server.use('/api/v1/navbar', navbarRoutes);
server.use(errorHandler);

const PORT = process.env.PORT || 5000;

const serverApp = server.listen(
  PORT,
  logger.info(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`),
  logger.error(new Error('Eroare')),
  logger.warn('Warning', { prop1: 'metadate', value: 10, test: 'bau' }),
  logger.debug('Debug')
);

//Handler unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  //close server and exit process
  serverApp.close(() => process.exit(1));
});
