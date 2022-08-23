const ErrorResponse = require('../../utils/errorResponse');
const asyncHandler = require('../../middleware/async');
const NavbarMenu = require('../../models/Navbar');

//	@description					Get all menus
//	@route								GET /api/v1/navbarmenu
// 	@access								Private
exports.getMenuNavbar = asyncHandler(async (req, res, next) => {
  let query;

  query = await NavbarMenu.find();

  const navbar = await query;

  res.status(200).json({
    success: true,
    count: navbar.length,
    data: navbar,
  });
});
