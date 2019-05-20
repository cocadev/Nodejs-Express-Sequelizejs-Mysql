module.exports = function(app) {
 
    const generals = require('../controller/general.controller.js');

    app.post('/api/addGeneral', generals.add);
    app.get('/api/generals', generals.findAll);

}