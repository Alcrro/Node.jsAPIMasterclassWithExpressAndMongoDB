const mongoose = require('mongoose');

const NavbarSchema = new mongoose.Schema({
  menuItem: {
    type: [String],
    required: true,
    enum: ['My Account', 'Favorite', 'My Cart'],
  },
});

module.exports = mongoose.model('Navbar', NavbarSchema);
