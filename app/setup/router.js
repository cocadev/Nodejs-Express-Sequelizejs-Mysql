import express from 'express'
import path from 'path'

import route_customer from '../../app/route/customer.route.js'
import auth_route from '../../app/route/auth.route.js'
import company_route from '../../app/route/company.route.js'
import project_route from '../../app/route/project.route.js'
import general_route from '../../app/route/general.route.js'
import profile_route from '../../app/route/profile.route.js'

const router = express.Router();

export default function (app) {

    route_customer(app)
    auth_route(app)
    company_route(app)
    project_route(app)
    general_route(app)
    profile_route(app)

    router.use(function (req, res, next) { console.log("/" + req.method); next(); });

    router.get("/", function (req, res) {
        res.sendFile(path.join(__dirname, '..', '..', 'views', 'index.html'))
    });
    router.get("/about", function (req, res) {
        res.sendFile(path.join(__dirname, '..', '..', 'views', 'about.html'))
    });
    router.get("/push", function (req, res) {
        res.sendFile(path.join(__dirname, '..', '..', 'views', 'push.html'))
    });
    router.get("/wrld", function (req, res) {

    });

    app.get("/api/image", function (req, res) {
        res.sendFile(path.join(__dirname, '..', '..', 'resources', 'static', 'image', 'astro.png'))
    });

    app.use("/", router);
    app.use("*", function (req, res) {
        res.sendFile(path.join(__dirname, '..', '..', 'views', '404.html'))
    });

}