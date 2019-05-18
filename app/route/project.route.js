module.exports = function(app) {
 
    const projects = require('../controller/project.controller.js');
 
    // Init data: add Projects & Users
    app.get('/api/projects/init', projects.init);
 
    // Retrieve all Projects (include Users)
    app.get('/api/projects/all', projects.findAll);
}