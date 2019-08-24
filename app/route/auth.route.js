// import * as verifySignUp from '../auth/verifySignUp';
import * as authJwt from '../auth/verifyJwtToken';
import * as controller from '../controller/auth.controller';

export default function(app) {
 
  app.get('/api/auth/init', controller.init);
 
  app.post('/api/auth/signup', controller.signup);
  
  app.post('/api/auth/signin', controller.signin);
  
  app.get('/api/test/user', [authJwt.verifyToken], controller.userContent);
  
  app.get('/api/test/pm', [authJwt.verifyToken, authJwt.isPmOrAdmin], controller.managementBoard);
  
  app.get('/api/test/admin', [authJwt.verifyToken, authJwt.isAdmin], controller.adminBoard);

  app.get('/api/users', [authJwt.verifyToken], controller.userAll);
  app.get('/api/pms', [authJwt.verifyToken, authJwt.isPmOrAdmin], controller.pmAll);
  app.get('/api/admins', [authJwt.verifyToken, authJwt.isAdmin], controller.adminAll);

}