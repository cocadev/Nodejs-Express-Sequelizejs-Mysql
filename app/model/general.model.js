module.exports = (sequelize, Sequelize) => {
    const General = sequelize.define('general', {
      name: {
        type: Sequelize.STRING
      },
      house_type: {
        type: Sequelize.STRING
      },
      general_type: {
        type: Sequelize.STRING
      },
      age: {
        type: Sequelize.INTEGER
      },
      popularity: {
        type: Sequelize.FLOAT
      },
      rate: {
        type: Sequelize.INTEGER
      },
      history: {
        type: Sequelize.STRING
      },
    });
    
    return General;
  }