import db from '../config/db.js'
import * as config from '../config/env'

const ROLES = config.ROLES;
const User = db.user;
const General = db.generals;



export const checkNameEmailExisted = (req, res, next) => {

  var username = req.body.username
  var email = req.body.email

  if (!username) { res.status(400).send({ "success": false, "message": "Username is empty" }); return; }
  if (!email) { res.status(400).send({ "success": false, "message": "Email is empty" }); return; }
  if (username.length < 3) { res.status(400).send({ "success": false, "message": "Name Length must be over 3." }); return; }


  next();
}

export const checkDuplicateUserNameOrEmail = (req, res, next) => {

  // -> Check Username is already in use
  User.findOne({
    where: {
      username: req.body.username
    }
  }).then(user => {
    if (user) {
      res.status(400).send({ "success": false, "message": "Username is already taken!" });
      return;
    }

    // -> Check Email is already in use
    User.findOne({
      where: {
        email: req.body.email
      }
    }).then(user => {
      if (user) {
        res.status(400).send({ "success": false, "message": "Email is already in use!" });
        return;
      }

      next();
    });
  });
}

export const checkDuplicateNameOrEmail = (req, res, next) => {
  // -> Check name is already in use
  General.findOne({
    where: {
      name: req.body.name
    }
  }).then(user => {
    if (user) {
      res.status(400).send({ "success": false, "message": "name is already taken!" });
      return;
    }

    // -> Check Email is already in use
    General.findOne({
      where: {
        email: req.body.email
      }
    }).then(user => {
      if (user) {
        res.status(400).send({ "success": false, "message": "Email is already in use!" });
        return;
      }

      next();
    });
  });
}

export const checkRolesExisted = (req, res, next) => {
  for (let i = 0; i < req.body.roles.length; i++) {
    if (!ROLES.includes(req.body.roles[i].toUpperCase())) {
      res.status(400).send({ "success": false, "message": "Does NOT exist Role = " + req.body.roles[i] });
      return;
    }
  }
  next();
}
