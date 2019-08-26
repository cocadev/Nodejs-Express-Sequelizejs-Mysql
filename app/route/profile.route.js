import * as authJwt from '../auth/verifyJwtToken';
import * as controller from '../controller/profile.controller';

export default function(app) {
 
  app.put('/api/profile', [ authJwt.verifyToken], controller.updateOne);
   
}