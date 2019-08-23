import { checkNameEmailExisted, checkDuplicateNameOrEmail} from '../auth/verifySignUp';
import generals from '../controller/general.controller.js'

export default function(app) {
 
    app.post('/api/addGeneral', [ checkNameEmailExisted, checkDuplicateNameOrEmail], generals.add);
    app.get('/api/generals', generals.findAll);

}