const db = require('../config/db.config.js');
const excel = require('exceljs');
const Json2csvParser = require('json2csv').Parser;

const Customer = db.customers;
const functions = require('../function.js');

global.__basedir = __dirname;

// Post a Customer
exports.create = (req, res) => {
	// Save to MySQL database
	Customer.create({
		firstname: req.body.firstname,
		lastname: req.body.lastname,
		age: req.body.age
	}).then(customer => {
		// Send created customer to client
		res.send(customer);
	});
};

// FETCH all Customers
exports.findAll = (req, res) => {
	Customer.findAll().then(customers => {
		// Send all customers to Client
		res.send(customers);
	});
};

// Find a Customer by Id
exports.findById = (req, res) => {
	Customer.findById(req.params.customerId).then(customer => {
		res.send(customer);
	})
};

// Update a Customer
exports.update = (req, res) => {
	const id = req.params.customerId;
	Customer.update({ firstname: req.body.firstname, lastname: req.body.lastname, age: req.body.age },
		{ where: { id: req.params.customerId } }
	).then(() => {
		res.status(200).send({ "success": true, "message": "updated successfully a customer with id = " + id });
	});
};

// Delete a Customer by Id
exports.delete = (req, res) => {
	const id = req.params.customerId;
	Customer.destroy({
		where: { id: id }
	}).then(() => {
		res.status(200).send({ "success": true, "message": "deleted successfully a customer with id = " + id });
	});
};

// excel all Customers
exports.excel = (req, res) => {
	Customer.findAll().then(customers => {

		const jsonCustomers = JSON.parse(JSON.stringify(customers));

		let workbook = new excel.Workbook(); //creating workbook
		let worksheet = workbook.addWorksheet('Customers'); //creating worksheet

		worksheet.columns = [
			{ header: 'Id', key: 'id', width: 10 },
			{ header: 'First Name', key: 'firstname', width: 30 },
			{ header: 'Last Name', key: 'lastname', width: 30 },
			{ header: 'Age', key: 'age', width: 10, outlineLevel: 1 }
		];

		// Add Array Rows
		worksheet.addRows(jsonCustomers);

		res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
		res.setHeader('Content-Disposition', 'attachment; filename=' + 'customer.xlsx');

		return workbook.xlsx.write(res)
			.then(function () {
				res.status(200).end();
			});
	});
};

// jsoncsv all Customers
exports.jsoncsv = (req, res) => {
	Customer.findAll().then(customers => {

		const jsonCustomers = JSON.parse(JSON.stringify(customers));

		// -> Convert JSON to CSV data
		const csvFields = ['id', 'firstname', 'lastname', 'age'];
		const json2csvParser = new Json2csvParser({ csvFields });
		const csvData = json2csvParser.parse(jsonCustomers);

		// -> Send CSV File to Client
		res.setHeader('Content-disposition', 'attachment; filename=customers.csv');
		res.set('Content-Type', 'text/csv');
		res.status(200).end(csvData);
	});
};


// FETCH all Customers
exports.uploadfile = (req, res) => {
	functions.importExcelData2MySQL(__basedir + '../../../uploads/' + req.file.filename);
  res.json({
		'msg': 'File uploaded/import successfully!', 'file': req.file
	});
};
