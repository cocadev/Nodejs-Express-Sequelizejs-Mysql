const db = require('../config/db.config.js');
const General = db.generals;

// Post a General
exports.add = (req, res) => {
	General.create({
		name: req.body.name,
        house_type: req.body.house_type,
        general_type: req.body.general_type,
		popularity: req.body.popularity,
		rate: req.body.rate,
		history: req.body.history,
		age: req.body.age
	}).then(createdGeneral => {
		res.status(200).send({ "success": true, "message": "created successfully", "general": createdGeneral });
	});
};

// FETCH all Generals
exports.findAll = (req, res) => {
	General.findAll({
	//   attributes: [['uuid', 'customerId'], ['firstname', 'lastname'], 'age'],
	//   include: [{
	// 	model: Address,
	// 	where: { fk_customerid: db.Sequelize.col('general.id') },
	// 	attributes: ['street', 'phone']
	//   }]
	}).then(generals => {
		res.status(200).send({ "success": true, "results": generals });
	});
   
  };