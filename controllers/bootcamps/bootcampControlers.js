//	@description					Get all bootcamps
//	@route								GET /api/v1/bootcamps
// 	@access								Public
exports.getBootcamps = async (req, res, next) => {
  res.status(200).json({ success: true, message: 'Show all bootcamps' });
};

//	@description					Get an single bootcamp
//	@route								GET /api/v1/bootcamp/:id
// 	@access								Public
exports.getBootcamp = async (req, res, next) => {
  res.status(200).json({
    success: true,
    message: `Get an single bootcamp ${req.params.id}`,
  });
};

//	@description					Create an bootcamp
//	@route								POST /api/v1/bootcamp
// 	@access								Public
exports.createBootcamp = async (req, res, next) => {
  res.status(200).json({ success: true, message: 'Create an bootcamp' });
};

//	@description					Update an bootcamp
//	@route								PUT /api/v1/bootcamp/:id
// 	@access								Public
exports.updateBootcamp = async (req, res, next) => {
  res.status(200).json({ success: true, message: 'Update an bootcamp' });
};

//	@description					Delete an bootcamp
//	@route								DELETE /api/v1/bootcamp/:id
// 	@access								Public
exports.deleteBootcamp = async (req, res, next) => {
  res.status(200).json({ success: true, message: 'Delete an bootcamp' });
};
