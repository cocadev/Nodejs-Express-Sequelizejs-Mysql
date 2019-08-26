import db from '../config/db.js';

const User = db.user;
 
export const update = (req, res) => {  

  let firstName = req.body.firstName
  let surName = req.body.surName
  let image = req.body.image
  let username = req.body.username
  let dateOfBirth = req.body.dateOfBirth
  let placeOfBirth = req.body.placeOfBirth
  let nationality = req.body.nationality
  let maritalStatus = req.body.maritalStatus
  let address = req.body.address
  let phone = req.body.phone
  let website = req.body.website
  let job = req.body.job
 
  User.create({
    firstName, 
    surName,
    image,
    username,
    dateOfBirth,
    placeOfBirth,
    nationality,
    maritalStatus,
    address,
    phone,
    website,
    job
  }).then(result => {
      console.log( '~~~~~~~~~~~~~~~~~~', result)
  })
};
