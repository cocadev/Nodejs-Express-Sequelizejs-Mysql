import db from '../config/db.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import Sequelize from 'sequelize';
import * as config from '../config/env'
import { InitialDB } from '../config/initial-db'

const User = db.user;
const Role = db.role;
const Op = db.Sequelize.Op;

export const init = (req, res) => {  

  InitialDB.AUTH.map((item)=>User.create({ 
    username: item.username, 
    email: item.email, 
    password: bcrypt.hashSync(item.password, 8), 
    rule: item.rule 
  }))
 
  return res.status(200).send({ "success": true, "message": "DB INFO Created!" });

}

export const signup = (req, res) => {
  // Save User to Database
  let username = req.body.username
  let email = req.body.email
  let password = req.body.password
  let confirm_password = req.body.confirm_password

  console.log("Processing func -> SignUp", password);


  if (username && email && password.length < 8) {
    let message = null
    if (password !== confirm_password) {
      message = 'Password is not matched.'
    } else {
      message = 'Password should be over 8 letters'
    }
    res.status(400).send({ "success": false, message });
    return false
  }

  User
    .create({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
      rule: req.body.rule,

    })
    .then(function (user) {
      res.status(200).send({ "success": true, "message": "User registered successfully!", "user": user });
    })
    .catch(function (err) {
      console.log('******** err ********', err.errors[0].message)
      res.status(400).send({ "success": false, "message": err.errors[0].message });

    })

}

export const signin = (req, res) => {
  console.log("Sign-In");

  let email = req.body.email
  let password = req.body.password

  if (!email) {
    res.status(400).send({ "success": false, message: "Email is empty" });
    return false
  }
  if (!password) {
    res.status(400).send({ "success": false, message: "Password is empty" });
    return false
  }

  User
    .findOne({
      where: {
        email: req.body.email
      }
    })
    .then(function (user) {
      if (!user) {
        res.status(404).send({ "success": false, message: "User not found" });
        return false
      }

      var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
      if (!passwordIsValid) {
        res.status(401).send({ success: false, accessToken: null, message: "Invalid Password!" });
        return false
      }

      var token = jwt.sign({ id: user.id }, config.SECRET, {
        expiresIn: 86400 // expires in 24 hours
      });

      res.status(200).send({ success: true, accessToken: token });

    })
    .catch(function (err) {
      console.log('******** err ********', err)

      res.status(400).send({ "success": false, "message": err });
    });
}

export const userContent = (req, res) => {
  User.findOne({
    where: { id: req.userId },
    attributes: ['username', 'email', 'rule'],
    // include: [{
    //   model: Role,
    //   attributes: ['id', 'username'],
    //   through: {
    //     attributes: ['userId', 'roleId'],
    //   }
    // }]
  }).then(user => {
    res.status(200).json({
      "description": "User Content Page",
      "user": user
    });
  }).catch(err => {
    res.status(500).json({
      "description": "Can not access User Page",
      "error": err
    });
  })
}

export const userAll = (req, res) => {
  console.log(' ** request **', req.rule)
  User.findAll({
    where: { rule: 'USER' },
    attributes: ['username', 'email', 'rule'],
  }).then(user => {
    res.status(200).json({
      "success": true,
      "users": user
    });
  }).catch(err => {
    res.status(500).json({
      "description": "Can not access User Page",
      "error": err
    });
  })
}

export const adminAll = (req, res) => {
  console.log(' ** request **', req.rule)
  User.findAll({
    where: { rule: 'ADMIN' },
    attributes: ['username', 'email', 'rule'],
  }).then(user => {
    res.status(200).json({
      "success": true,
      "users": user
    });
  }).catch(err => {
    res.status(500).json({
      "description": "Can not access User Page",
      "error": err
    });
  })
}

export const pmAll = (req, res) => {
  console.log(' ** request **', req.rule)
  User.findAll({
    where: { rule: 'PM' },
    attributes: ['username', 'email', 'rule'],
  }).then(user => {
    res.status(200).json({
      "success": true,
      "users": user
    });
  }).catch(err => {
    res.status(500).json({
      "description": "Can not access User Page",
      "error": err
    });
  })
}

export const adminBoard = (req, res) => {
  User.findOne({
    where: { id: req.userId },
    attributes: ['name', 'username', 'email'],
    include: [{
      model: Role,
      attributes: ['id', 'name'],
      through: {
        attributes: ['userId', 'roleId'],
      }
    }]
  }).then(user => {
    res.status(200).json({
      "description": "Admin Board",
      "user": user
    });
  }).catch(err => {
    res.status(500).json({
      "description": "Can not access Admin Board",
      "error": err
    });
  })
}

export const managementBoard = (req, res) => {
  User.findOne({
    where: { id: req.userId },
    attributes: ['name', 'username', 'email'],
    include: [{
      model: Role,
      attributes: ['id', 'name'],
      through: {
        attributes: ['userId', 'roleId'],
      }
    }]
  }).then(user => {
    res.status(200).json({
      "description": "Management Board",
      "user": user
    });
  }).catch(err => {
    res.status(500).json({
      "description": "Can not access Management Board",
      "error": err
    });
  })
}