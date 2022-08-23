const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');

//Load env vars
dotenv.config({ path: './configs/.env' });

//Load models
const Bootcamp = require('./models/Bootcamp');
const Course = require('./models/Course');
const Navbar = require('./models/Navbar');

//Connect to DB
mongoose.connect(process.env.MONGO_URI);

//Read JSON files
const bootcamps = JSON.parse(
  fs.readFileSync(`${__dirname}/databaseModel/bootcamps.json`, 'utf-8')
);
const courses = JSON.parse(
  fs.readFileSync(`${__dirname}/databaseModel/courses.json`, 'utf-8')
);

const navbar = JSON.parse(
  fs.readFileSync(`${__dirname}/databaseModel/navbarmenu.json`, 'utf-8')
);

//Import into DB
const importData = async () => {
  try {
    await Bootcamp.create(bootcamps);
    await Course.create(courses);
    await Navbar.create(navbar);
    console.log('Data imported...'.green);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

//Delete Data
const deleteData = async () => {
  try {
    await Bootcamp.deleteMany();
    await Course.deleteMany();
    await Navbar.deleteMany();
    console.log('Data Destroyed...'.red);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
}
