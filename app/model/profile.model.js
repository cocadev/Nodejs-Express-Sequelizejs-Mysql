export default (sequelize, Sequelize) => {
  const Profile = sequelize.define('profile', {
    uuid: {
			type: Sequelize.UUID,
			defaultValue: Sequelize.UUIDV1,
			primaryKey: true
		},
    firstName: Sequelize.STRING,
    surName: Sequelize.STRING,
    image: Sequelize.STRING,
    dateOfBirth: Sequelize.STRING,
    placeOfBirth: Sequelize.STRING,
    nationality: Sequelize.STRING,
    maritalStatus: Sequelize.STRING,
    address: Sequelize.STRING,
    phone: Sequelize.STRING,
    website: Sequelize.STRING,
    job: Sequelize.STRING
  })

  return Profile;
}