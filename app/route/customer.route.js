module.exports = function(app) {
 
    const customers = require('../controller/customer.controller.js');
 
    // Create a new Customer
    app.post('/api/addCustomer', customers.create);
 
    // Retrieve all Customer
    app.get('/api/getAllCustomers', customers.findAll);
 
    // Retrieve a single Customer by Id
    app.get('/api/getOneCustomer/:customerId', customers.findById);
 
    // Update a Customer with Id
    app.put('/api/updateCustomer/:customerId', customers.update);
 
    // Delete a Customer with Id
    app.delete('/api/deleteCustomer/:customerId', customers.delete);
}