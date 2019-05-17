module.exports = function(app) {
 
    const customers = require('../controller/customer.controller.js');
 
    //Customer
    app.post('/api/addCustomer', customers.create);
    app.get('/api/getAllCustomers', customers.findAll);
    app.get('/api/getOneCustomer/:customerId', customers.findById);
    app.put('/api/updateCustomer/:customerId', customers.update);
    app.delete('/api/deleteCustomer/:customerId', customers.delete);
    app.get('/api/downloadAllCustomers/excel', customers.download);

}