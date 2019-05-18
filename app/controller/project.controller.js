const db = require('../config/db.config.js');
const Project = db.project;
const User = db.user;
 
// Init data: Projects & Users
exports.init = (req, res) => {  
 
  User.create({
    firstname: "Jack",
    lastname: "Davis",
    age: 37    
  }).then(jack => {
      let users = [jack];
      
      return User.create({
        firstname: "Mary",
        lastname: "Taylor",
        age: 21
      }).then(mary => {
        users.push(mary);
        return users;
      })
  }).then(users => {
    Project.create({
      code: 'P-123',
      name: 'JSA - Branding Development'
    }).then(p123 => {
      p123.setWorkers(users);
    })
    
    Project.create({
      code: 'P-456',
      name: 'JSA - DataEntry Development'
    }).then(p456 => {
      p456.setWorkers(users);
    })
  }).then(() => {
    res.send("OK");
  });
};
 
// Fetch all Projects include Users
exports.findAll = (req, res) => {
  Project.findAll({
    attributes: ['code', 'name'],
    include: [{
      model:User, as: 'Workers',
      attributes: [['firstname', 'name'], 'age'],
      through: {
        attributes: ['projectId', 'userId'],
      }
      }]
  }).then(projects => {
     res.send(projects);
  });
};