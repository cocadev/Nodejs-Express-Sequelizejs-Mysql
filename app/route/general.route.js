import * as addGeneral from '../auth/verifySignUp';
import * as generals from '../controller/general.controller.js'

export default function(app) {
 
    app.post('/api/addGeneral', [ addGeneral.checkNameEmailExisted, addGeneral.checkDuplicateNameOrEmail], generals.add);
    app.get('/api/generals', generals.findAll);

}