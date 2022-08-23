//	@description					Get index
//	@route								GET /
// 	@access								Public

exports.getIndex = async (req, res, next) => {
  res.render('index/index', {
    pageTitle: 'ALCRO.RO',
  });
};
