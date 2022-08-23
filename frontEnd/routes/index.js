const express = require('express');
const router = express.Router();

const controllers = require('../controllers/controllers');

router.get('/', controllers.getIndex);

module.exports = router;
