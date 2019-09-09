import db from '../config/db.js';
import bcrypt from 'bcryptjs';
import { InitialDB } from '../config/initial-db'

var Fakerator = require("fakerator");
var fakerator = Fakerator();

const User = db.user;
const Profile = db.profile;
const General = db.generals;

export const init = (req, res) => {

  /////////////////////////////////////////////// User and Profile init ///////////////////////////////////////////////////

  InitialDB.AUTH.map((item) => User.create({
    username: item.username,
    email: item.email,
    password: bcrypt.hashSync(item.password, 8),
    rule: item.rule
  }).then(createdUser => {

    var randomUser = fakerator.entity.user()

    return Profile.create({
      firstName: randomUser.firstName,
      surName: randomUser.lastName,
      image: randomUser.avatar,
      location: randomUser.address.geo.latitude.toFixed(4) + ', ' + randomUser.address.geo.longitude.toFixed(4),
      dateOfBirth: randomUser.dob.toString(),
      placeOfBirth: randomUser.address.city,
      nationality: randomUser.address.country,
      maritalStatus: 'single',
      address: randomUser.address.street,
      phone: randomUser.phone,
      website: randomUser.website,
      job: randomUser.password,
    }).then(result => {
      createdUser.setProfile(result)
    })
  })
  )

  /////////////////////////////////////////////// General init ///////////////////////////////////////////////////

  InitialDB.GENERAL.map((item) => General.create({
    name: item.name,
    birth: item.birth,
    popularity: item.popularity,
    history: item.history,
    type: item.type
  })
  )

  return res.status(200).send({ "success": true, "message": "DB INFO Created!" });

}

