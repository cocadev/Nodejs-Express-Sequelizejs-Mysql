const verifySignUp = require('../auth/verifySignUp');

module.exports = function(app) {
 
    const generals = require('../controller/general.controller.js');

    app.post('/api/addGeneral', [ verifySignUp.checkNameEmailExisted, verifySignUp.checkDuplicateNameOrEmail], generals.add);
    app.get('/api/generals', generals.findAll);

}