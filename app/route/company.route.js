module.exports = function(app) {
 
    const companies = require('../controller/company.controller.js');

    // Init data: Companies & Products
    app.get('/api/companies/init', companies.init);
 
    // Retrieve all Companies
    app.get('/api/companies/all', companies.findAll);
}