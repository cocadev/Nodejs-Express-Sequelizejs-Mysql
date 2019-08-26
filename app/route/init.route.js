import * as controller from '../controller/init.controller';

export default function(app) {

  app.get('/api/init', controller.init);

}