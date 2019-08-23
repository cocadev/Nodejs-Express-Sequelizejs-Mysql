import db from '../config/db.js';
import excel from 'exceljs';
import { Parser } from 'json2csv'

const Customer = db.customers;
const Address = db.address;

const functions = require('../function.js');

global.__basedir = __dirname;

// Post a Customer
export const create = (req, res) => {
	// Save to MySQL database
	Customer.create({
		firstname: req.body.firstname,
		lastname: req.body.lastname,
		age: req.body.age
	}).then(createdCustomer => {
		customer = createdCustomer;

		return Address.create({
			street: req.body.street,
			phone: req.body.phone
		}).then(address => {
			customer.setAddress(address)
			res.status(200).send({ "success": true, "message": "created successfully" });
		})
	});
};

// FETCH all Customers
export const findAll = (req, res) => {
	Customer.findAll({
	  attributes: [['uuid', 'customerId'], ['firstname', 'lastname'], 'age'],
	  include: [{
		model: Address,
		where: { fk_customerid: db.Sequelize.col('customer.uuid') },
		attributes: ['street', 'phone']
	  }]
	}).then(customers => {
	   res.send(customers);
	});
   
  };

// Find a Customer by Id
export const findById = (req, res) => {
	Customer.findById(req.params.customerId).then(customer => {
		res.send(customer);
	})
};

// Update a Customer
export const update = (req, res) => {
	const id = req.params.customerId;
	Customer.update({ firstname: req.body.firstname, lastname: req.body.lastname, age: req.body.age },
		{ where: { id: req.params.customerId } }
	).then(() => {
		res.status(200).send({ "success": true, "message": "updated successfully a customer with id = " + id });
	});
};

// Delete a Customer by Id
export const deleteCustomer = (req, res) => {
	const id = req.params.customerId;
	Customer.destroy({
		where: { id: id }
	}).then(() => {
		res.status(200).send({ "success": true, "message": "deleted successfully a customer with id = " + id });
	});
};

// excel all Customers
export const excelCustomer = (req, res) => {
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
export const jsoncsv = (req, res) => {
	Customer.findAll().then(customers => {

		const jsonCustomers = JSON.parse(JSON.stringify(customers));

		// -> Convert JSON to CSV data
		const csvFields = ['id', 'firstname', 'lastname', 'age'];
		const json2csvParser = new Parser({ csvFields });
		const csvData = json2csvParser.parse(jsonCustomers);

		// -> Send CSV File to Client
		res.setHeader('Content-disposition', 'attachment; filename=customers.csv');
		res.set('Content-Type', 'text/csv');
		res.status(200).end(csvData);
	});
};


// FETCH all Customers
export const uploadfile = (req, res) => {
	functions.importExcelData2MySQL(__basedir + '../../../uploads/' + req.file.filename);
	res.json({
		'msg': 'File uploaded/import successfully!', 'file': req.file
	});
};
