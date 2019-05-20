require('dotenv').config({ path: '.env' });


var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var webPush = require('web-push');
var path = require('path');

const functions = require('./app/function.js');
const db = require('./app/config/db.config.js');

const publicVapidKey = process.env.PUBLIC_VAPID_KEY;
const privateVapidKey = process.env.PRIVATE_VAPID_KEY;

webPush.setVapidDetails('mailto:eugene19950901@outlook.com', publicVapidKey, privateVapidKey);
webPush.setGCMAPIKey('AIzaSyAvoWrQ8Udyos3cqsqf7ZqjDX2CHvoYGY0');

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json())

app.post('/subscribe',  function(req, res){
  const subscription = req.body
  res.status(201).json({});
  const payload = JSON.stringify({
    title: 'Push notifications with Service Workers',
  });
  webPush.sendNotification(subscription, payload)
    .then(res=>console.log('*** sent! ***', res))
    .catch(error => console.error('*** err ****************8 ***', error));
});

var router = express.Router();
var path = __dirname + '/views/';

// force: true will drop the table if it already exists
// db.sequelize.sync({force: true}).then(() => {
//   console.log('Drop and Resync with { force: true }');
//   functions.roleInitial();
// });


require('./app/route/customer.route.js')(app);
require('./app/route/auth.route.js')(app);
require('./app/route/company.route.js')(app);
require('./app/route/project.route.js')(app);

router.use(function (req, res, next) { console.log("/" + req.method); next();});


////////////
// Router //
////////////
router.get("/",function(req, res){ res.sendFile(path + "index.html")});
router.get("/about",function(req, res){ res.sendFile(path + "about.html")});
router.get("/push",function(req, res){ res.sendFile(path + "push.html")});

app.get("/api/image", function(req,res){
  return res.sendFile(__dirname + "/resources/static/image/astro.png");
});

app.use("/", router);
app.use("*",function(req,res){ res.sendFile(path + "404.html")});

var server = app.listen(process.env.PORT, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("App listening at http://%s:%s", host, port)
})

