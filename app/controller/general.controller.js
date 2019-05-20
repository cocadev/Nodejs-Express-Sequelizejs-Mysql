const db = require('../config/db.config.js');
const General = db.generals;
const Op = db.Sequelize.Op;

// Post a General
exports.add = (req, res) => {
	General.create({
        name: req.body.name,
        email: req.body.email,
		status: req.body.status,
        house_type: req.body.house_type,
        general_type: req.body.general_type,
		popularity: req.body.popularity,
		rate: req.body.rate,
		history: req.body.history,
		age: req.body.age
	}).then(createdGeneral => {
		res.status(200).send({ "success": true, "message": "created successfully", "general": createdGeneral });
    }).catch(e =>
        res.status(500).send({ "success": false, "message": e.message })
    )
};

// FETCH all Generals
exports.findAll = (req, res) => {
	let query = req.query.name?req.query.name:''
	let page = req.query.page?parseInt(req.query.page):0
	let limit = req.query.limit?parseInt(req.query.limit):100
	let total = 0;
	// var cb    = function(err, info) {
	// 	console.log('count is ' + info);
	// };

	// General.findAll().done(cb);
	General.findAndCountAll().done((res) => {
		total = res.count
	})
	General.findAll({
        where: {
            // status: 'active',
            name : {
				[Op.like]: "%" + query + "%"
			},
		},
		offset: page*limit, 
		limit
	//   attributes: [['uuid', 'customerId'], ['firstname', 'lastname'], 'age'],
	//   include: [{
	// 	model: Address,
	// 	where: { fk_customerid: db.Sequelize.col('general.id') },
	// 	attributes: ['street', 'phone']
	//   }]
	}).then((generals, count) => {
		res.status(200).send({ "success": true, Totalcount: total, TotalPage: Math.ceil(total/limit), "results": generals });
	}).catch(e =>
        res.status(500).send({ "success": false, "message": e.message })
    )
   
  };