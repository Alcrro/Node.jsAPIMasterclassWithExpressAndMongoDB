const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const cors = require('cors');
const server = express();

//Body Parser
server.use(express.json());
server.use(cors());

//Load env vars
dotenv.config({ path: './configs/.env' });

//Set engine
server.set('view engine', 'ejs');
const viewspath = path.join(__dirname, './public_html/views');
server.set('views', viewspath);

server.use(bodyParser.urlencoded({ extended: false }));
server.use(express.static(path.join(__dirname, './public')));

//routes
const indexRoutes = require('../frontEnd/routes/index');

//Set  routes
server.use(indexRoutes);

const PORT = process.env.PORT || 3000;

const serverApp = server.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV.green} mode on port ${PORT.green}`
  )
);
