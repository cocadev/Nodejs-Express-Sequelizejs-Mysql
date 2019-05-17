var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const db = require('./app/config/db.config.js');

app.use(bodyParser.json())
var router = express.Router();
var path = __dirname + '/views/';

// force: true will drop the table if it already exists
// db.sequelize.sync({force: true}).then(() => {
//   console.log('Drop and Resync with { force: true }');
// });

require('./app/route/customer.route.js')(app);
 
router.use(function (req,res,next) {
  console.log("/" + req.method);
  next();
});
 
router.get("/",function(req,res){
  res.sendFile(path + "index.html");
});
 
router.get("/about",function(req,res){
  res.sendFile(path + "about.html");
});

app.use("/", router);
 
app.use("*",function(req,res){
  res.sendFile(path + "404.html");
});





// Create a Server
var server = app.listen(8081, function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log("App listening at http://%s:%s", host, port)
})