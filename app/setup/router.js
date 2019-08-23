import express from 'express'
import path from 'path'

const router = express.Router();

// var router = express.Router();

module.exports = function(app) {

    require('../../app/route/customer.route.js')(app);
    require('../../app/route/auth.route.js')(app);
    require('../../app/route/company.route.js')(app);
    require('../../app/route/project.route.js')(app);
    require('../../app/route/general.route.js')(app);

    

    router.use(function (req, res, next) { console.log("/" + req.method); next(); });

    ////////////
    // Router //
    ////////////
    router.get("/", function (req, res) { 
        res.sendFile(path.join(__dirname, '..', '..', 'views', 'index.html')) 
    });
    router.get("/about", function (req, res) { 
        res.sendFile(path.join(__dirname, '..', '..', 'views', 'about.html')) 
    });
    router.get("/push", function (req, res) { 
        res.sendFile(path.join(__dirname, '..', '..', 'views', 'push.html')) 
    });

    app.get("/api/image", function (req, res) {
        res.sendFile(path.join(__dirname, '..', '..', 'resources', 'static', 'image', 'astro.png'))
    });

    app.use("/", router);
    // app.use("*", function (req, res) { res.sendFile(router_path + "404.html") });


    


}