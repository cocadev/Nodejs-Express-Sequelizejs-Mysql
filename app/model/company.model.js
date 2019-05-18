module.exports = (sequelize, Sequelize) => {
    const Company = sequelize.define('company', {
      uuid: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV1,
      primaryKey: true
      },
      name: {
        type: Sequelize.STRING
      },
      street: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      }
    });
    
    return Company;
  }