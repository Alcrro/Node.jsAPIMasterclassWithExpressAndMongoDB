const express = require('express');
const router = express.Router();
const {
  getMenuNavbar,
} = require('../../controllers/navbarController/navbarController');

router.route('/').get(getMenuNavbar);

module.exports = router;
