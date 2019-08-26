import db from '../config/db.js';
import bcrypt from 'bcryptjs';
import { InitialDB } from '../config/initial-db'

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

    return Profile.create({
      firstName: item.firstName,
      surName: item.surName,
      image: item.image,
      location: item.location,
      dateOfBirth: item.dateOfBirth,
      placeOfBirth: item.placeOfBirth,
      nationality: item.nationality,
      maritalStatus: item.maritalStatus,
      address: item.address,
      phone: item.phone,
      website: item.website,
      job: item.job,
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

