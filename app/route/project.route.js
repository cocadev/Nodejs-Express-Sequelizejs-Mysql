import projects from '../controller/project.controller.js'

export default function(app) {
  
    // Init data: add Projects & Users
    app.get('/api/projects/init', projects.init);
 
    // Retrieve all Projects (include Users)
    app.get('/api/projects/all', projects.findAll);
}