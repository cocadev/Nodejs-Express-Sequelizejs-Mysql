import db from '../config/db.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import Sequelize from 'sequelize';
import * as config from '../config/env'

const User = db.user;
const Role = db.role;
const Op = db.Sequelize.Op;

export const signup = (req, res) => {
  // Save User to Database
  let username = req.body.username
  let email = req.body.email
  let password = req.body.password
  let confirm_password = req.body.confirm_password

  console.log("Processing func -> SignUp", password);


  if(username && email && password.length < 8){
    let message = null
    if( password !== confirm_password){
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


//   Role.findAll({
//     where: {
//       name: {
//         [Op.or]: req.body.roles
//       }
//     }
//   }).then(roles => {
//     user.setRoles(roles).then(() => {
//       res.status(200).send({ "success": true, "message": "User registered successfully!", "user": user, "roles": roles });
//     });
//   }).catch(err => {
//     res.status(500).send("Error -> " + err);
//   });
// }).catch(err => {
//   res.status(500).send("Fail! Error -> " + err);
// })


export const signin = (req, res) => {
  console.log("Sign-In");

  User.findOne({
    where: {
      username: req.body.username
    }
  }).then(user => {
    if (!user) {
      return res.status(404).send('User Not Found.');
    }

    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordIsValid) {
      return res.status(401).send({ auth: false, accessToken: null, reason: "Invalid Password!" });
    }

    var token = jwt.sign({ id: user.id }, config.SECRET, {
      expiresIn: 86400 // expires in 24 hours
    });

    res.status(200).send({ auth: true, accessToken: token });

  }).catch(err => {
    res.status(500).send('Error -> ' + err);
  });
}

export const userContent = (req, res) => {
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