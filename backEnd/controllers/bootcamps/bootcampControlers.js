const ErrorResponse = require('../../utils/errorResponse');
const asyncHandler = require('../../middleware/async');
const Bootcamp = require('../../models/Bootcamp');
const geocoder = require('../../utils/geocoder');
const logger = require('../../utils/log');

//	@description					Get all bootcamps
//	@route								GET /api/v1/bootcamps
// 	@access								Public
exports.getBootcamps = asyncHandler(async (req, res, next) => {
  let start = new Date();
  let query;

  //Copy req.query
  const reqQuery = { ...req.query };

  //Fields to exclude from match
  const removeFields = ['select', 'sort', 'limit'];

  //Loop over removeFields and delete them from reQuery
  removeFields.forEach((param) => delete reqQuery[param]);

  console.log(reqQuery);

  //Create query params as a string
  let queryStr = JSON.stringify(reqQuery);

  //Create operators ($gt, $gte, etc)
  queryStr = queryStr.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`
  );

  //Finding resource
  query = Bootcamp.find(JSON.parse(queryStr)).populate('courses');

  //Select Fields
  if (req.query.select) {
    const fields = req.query.select.split(',').join(' ');
    query = query.select(fields);
    console.log(fields);
  }

  //Sort
  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy);
  } else {
    query = query.sort('-createdAt');
  }

  //Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 25;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await Bootcamp.countDocuments();

  query = query.skip(startIndex).limit(limit);

  //Executing query;
  const bootcamps = await query;

  //Pagination result
  const pagination = {};
  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit,
    };
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit,
    };
  }

  res.status(200).json({
    success: true,
    count: bootcamps.length,
    pagination,
    data: bootcamps,
  });

  let end = new Date() - start;
  logger.info(
    JSON.stringify({
      method: req.method,
      query: req.query,
      params: req.params,
      duration: `${end} ms`,
    })
  );
});

//	@description					Get an single bootcamp
//	@route								GET /api/v1/bootcamp/:id
// 	@access								Public
exports.getBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);

  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: bootcamp,
  });
});

//	@description					Create an bootcamp
//	@route								POST /api/v1/bootcamp
// 	@access								Public
exports.createBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.create(req.body);
  res.status(201).json({
    success: true,
    data: bootcamp,
  });
});

//	@description					Update an bootcamp
//	@route								PUT /api/v1/bootcamp/:id
// 	@access								Public
exports.updateBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!bootcamp) {
    new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404);
  }

  res.status(200).json({ success: true, data: bootcamp });
});

//	@description					Delete an bootcamp
//	@route								DELETE /api/v1/bootcamp/:id
// 	@access								Public
exports.getBootcampsInRadius = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);
  if (!bootcamp) {
    new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404);
  }

  res.status(200).json({ success: true, data: {} });
});

//	@description					Delete an bootcamp
//	@route								DELETE /api/v1/bootcamp/:id
// 	@access								Public

exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);
  if (!bootcamp) {
    new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404);
  }

  bootcamp.remove();

  res.status(200).json({ success: true, data: {} });
});

//	@description					Get bootcamps within a radius
//	@route								GET /api/v1/bootcamps/radius/:zipcode/:distance
// 	@access								Public
exports.getBootcampsInRadius = asyncHandler(async (req, res, next) => {
  const { zipcode, distance } = req.params;

  // Get lat/lng from gecoder
  const loc = await geocoder.geocode(zipcode);
  const lat = loc[0].latitude;
  const lng = loc[0].longitude;

  // Calc radius using radians
  // Divide distance by radius of Earth
  // Earth Radius = 3,963 mi / 6,378 km
  const radius = distance / 3963;

  const bootcamps = await Bootcamp.find({
    location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } },
  });
  res.status(200).json({
    success: true,
    count: bootcamps.length,
    data: bootcamps,
  });
});
