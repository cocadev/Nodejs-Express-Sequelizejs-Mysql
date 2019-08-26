import db from '../config/db.js';

const Profile = db.profile;

export const updateOne = (req, res) => {

  let uuid = req.query.id

  let firstName = req.body.firstName
  let surName = req.body.surName
  let image = req.body.image
  let location = req.body.location
  let dateOfBirth = req.body.dateOfBirth
  let placeOfBirth = req.body.placeOfBirth
  let nationality = req.body.nationality
  let maritalStatus = req.body.maritalStatus
  let address = req.body.address
  let phone = req.body.phone
  let website = req.body.website
  let job = req.body.job

  Profile.update({
    firstName,
    surName,
    image,
    location,
    dateOfBirth,
    placeOfBirth,
    nationality,
    maritalStatus,
    address,
    phone,
    website,
    job,
  }, { where: { uuid } })
  .then(result => {
    console.log('~~~~~~~~~~~~~~~~~~', result)
    res.status(200).json({
      "success": true,
      "message": "Update success!"
    });
  }).catch(e =>  {
    console.log('*********************', e)
    res.status(500).json({
      "success": false,
      "message": "Bad Request",
    });
  })
};
