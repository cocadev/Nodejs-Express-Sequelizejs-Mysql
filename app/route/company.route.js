import * as companies from '../controller/company.controller.js';

export default function(app) {
 
    // Init data: Companies & Products
    app.get('/api/companies/init', companies.init);
 
    // Retrieve all Companies
    app.get('/api/companies/all', companies.findAll);
}